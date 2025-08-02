


const axios = require("axios");
const request = require("request");
const { allowCors } = require("../../../util");

export default allowCors((req, res) => {
  const {
    query: { hanzi },
  } = req;
  request(`https://hsk.academy/static/audio/mp3/characters/${encodeURI(hanzi)}.mp3`)
    .pipe(res);
});
