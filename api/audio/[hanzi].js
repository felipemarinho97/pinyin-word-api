const axios = require("axios");
const request = require("request");
const { allowCors } = require("../../util");

export default allowCors((req, res) => {
  const {
    query: { hanzi },
  } = req;

  const streamAudioFallback = (url) => {
    const audioRequest = request(url);
    let statusChecked = false;
    
    audioRequest.on('response', (response) => {
      statusChecked = true;
      if (response.statusCode === 404) {
        res.status(404);
        return;
      }
    });
    
    audioRequest.on('error', () => {
      if (!statusChecked) {
        res.status(404);
        return;
      }
    });
    
    req.pipe(audioRequest).pipe(res);
  };

  const chinesepodUrl = `https://www.chinesepod.com/api/v1/search/search-dictionary/?query=${encodeURI(hanzi)}&skip=0&limit=1`;
  const fallbackUrl = `https://hsk.academy/static/audio/mp3/characters/${encodeURI(hanzi)}.mp3`;

  axios.get(chinesepodUrl).then((_res) => {
    let url = _res.data.results[0]?.audioUrl;
    if (_res.data.count == 0 || url == null) {
      // Use HSK Academy fallback with status check
      streamAudioFallback(fallbackUrl);
    } else {
      // ChinesePod URL found, stream directly
      req.pipe(request(url)).pipe(res);
    }
  }).catch(() => {
    // Fallback to HSK Academy if ChinesePod fails
    streamAudioFallback(fallbackUrl);
  });
});
