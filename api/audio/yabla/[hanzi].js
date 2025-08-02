const axios = require("axios");
const request = require("request");
const { allowCors } = require("../../../util");

const YABLA_URI =
  "https://chinese.yabla.com/chinese-english-pinyin-dictionary.php";

export default allowCors((req, res) => {
  const {
    query: { hanzi },
  } = req;

  axios.get(`${YABLA_URI}?define=${encodeURI(hanzi)}`).then((_res) => {
    let URI = (_res.data + "").match(/https.*\.mp3/)[0];
    let file = URI.match(/[0-9]*\.mp3/)[0];

    req
      .pipe(request(`https://yabla.vo.llnwd.net/media.yabla.com/audio/${file}`))
      .pipe(res);
  });
});
