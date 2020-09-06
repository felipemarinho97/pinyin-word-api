const axios = require("axios");
const { allowCors } = require("../util");

const YABLA_URI =
  "https://chinese.yabla.com/chinese-english-pinyin-dictionary.php";

export default allowCors((req, res) => {
  const {
    query: { pinyin },
  } = req;

  axios.get(`${YABLA_URI}?define=${encodeURI(pinyin)}`).then((_res) => {
    res.json({ url: (_res.data + "").match(/https.*\.mp3/)[0] });
  });
});
