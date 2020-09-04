const express = require("express");
const axios = require("axios");
var request = require("request");

const app = express();

const YABLA_URI =
  "https://chinese.yabla.com/chinese-english-pinyin-dictionary.php";

app.get("/:pinyin", (req, res) => {
  const word = req.param("pinyin");

  axios.get(`${YABLA_URI}?define=${encodeURI(word)}`).then((_res) => {
    const URI = (_res.data + "").match(/https.*\.mp3/)[0];
    req.pipe(request(URI)).pipe(res);
  });
});

app.listen(8889, () => {
  console.log("running");
});
