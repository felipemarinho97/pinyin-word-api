const axios = require("axios");
const request = require("request");
const { allowCors } = require("../../../util");

export default allowCors((req, res) => {
  const {
    query: { hanzi },
  } = req;

  axios
    .get(
      `https://chinesepod.com/dictionary/english-chinese/${encodeURI(hanzi)}`
    )
    .then((_res) => {
      let URI = (_res.data + "").match(/https?.*\.mp3/)[0];

      req.pipe(request(unescape(URI))).pipe(res);
    });
});
