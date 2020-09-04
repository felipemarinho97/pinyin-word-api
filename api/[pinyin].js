const axios = require("axios");

const YABLA_URI =
  "https://chinese.yabla.com/chinese-english-pinyin-dictionary.php";

app.get("/:pinyin", (req, res) => {});

export default (req, res) => {
  const word = req.param("pinyin");

  axios.get(`${YABLA_URI}?define=${encodeURI(word)}`).then((_res) => {
    res.json({ url: (_res.data + "").match(/https.*\.mp3/)[0] });
  });
};
