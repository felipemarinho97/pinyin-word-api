const axios = require("axios");
const { allowCors } = require("../util");

export default allowCors((req, res) => {
  const {
    query: { hanzi },
  } = req;

  axios.get(`https://www.chinesepod.com/api/v1/search/search-dictionary/?query=${encodeURI(hanzi)}&skip=0&limit=1`).then((_res) => {
    if (_res.data.count == 0 || _res.data.results[0].audioUrl == null) {
      res.json({ url: `https://hsk.academy/static/audio/mp3/characters/${encodeURI(hanzi)}.mp3` });
      return;
    }
    res.json({ url: _res.data.results[0].audioUrl });
  });
});
