const axios = require("axios");
const request = require("request");
const { allowCors } = require("../../../util");

export default allowCors((req, res) => {
  const {
    query: { hanzi },
  } = req;
  axios
    .get(`https://www.chinesepod.com/api/v1/search/search-dictionary/?query=${encodeURI(hanzi)}&skip=0&limit=1`)
    .then((_res) => {
      let data = _res.data;
      if (data.count === 0) {
        res.status(404).send("No audio found for the given Hanzi.");
        return;
      }
      let URI = data.results[0].audioUrl;
      if (!URI) {
        res.status(404).send("No audio URL found for the given Hanzi.");
        return;
      }

      req.pipe(request(URI)).pipe(res);
    });
});

