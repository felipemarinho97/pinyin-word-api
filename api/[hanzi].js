const axios = require("axios");
const { allowCors } = require("../util");

export default allowCors((req, res) => {
  const {
    query: { hanzi },
  } = req;

  const chinesepodUrl = `https://www.chinesepod.com/api/v1/search/search-dictionary/?query=${encodeURI(hanzi)}&skip=0&limit=1`;
  const fallbackUrl = `https://hsk.academy/static/audio/mp3/characters/${encodeURI(hanzi)}.mp3`;

  axios.get(chinesepodUrl).then((_res) => {
    if (_res.data.count == 0 || _res.data.results[0].audioUrl == null) {
      // perfrorm a HEAD request to check if the audio file exists
      return axios.head(fallbackUrl).then(() => {
        res.json({ url: fallbackUrl });
      }).catch(() => {
        res.status(404).json({ error: "Audio not found" });
      });
    }
    res.json({ url: _res.data.results[0].audioUrl });
  }).catch(() => {
    //fallback to HSK Academy if ChinesePod fails
    axios.head(fallbackUrl).then(() => {
      res.json({ url: fallbackUrl });
    }).catch(() => {
      res.status(404).json({ error: "Audio not found" });
    });
  });
});
