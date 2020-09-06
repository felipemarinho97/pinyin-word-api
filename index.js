const express = require("express");
const axios = require("axios");
var request = require("request");

const app = express();

const YABLA_URI =
  "https://chinese.yabla.com/chinese-english-pinyin-dictionary.php";

app.get("/:pinyin", (req, res) => {
  const word = req.param("pinyin");
  res.setHeader("Cache-Control", "max-age=0, s-maxage=31536000");

  axios.get(`${YABLA_URI}?define=${encodeURI(word)}&limit=1`).then((_res) => {
    let URI = (_res.data + "").match(/https?.*\.mp3/)[0];
    let file = URI.match(/[0-9]*\.mp3/)[0];

    req
      .pipe(request(`https://yabla.vo.llnwd.net/media.yabla.com/audio/${file}`))
      .pipe(res);
  });
});

app.get("/pod/:pinyin", (req, res) => {
  const word = req.param("pinyin");
  res.setHeader("Cache-Control", "max-age=0, s-maxage=31536000");

  axios
    .get(`https://chinesepod.com/dictionary/english-chinese/${encodeURI(word)}`)
    .then((_res) => {
      let URI = (_res.data + "").match(/https?.*\.mp3/)[0];

      req.pipe(request(unescape(URI))).pipe(res);
    });
});
var { segment } = require("hanzi-tools");
app.post("/segment", (req, res) => {
  console.log(req.body);
  const text = req.body.text;

  res.setHeader("Cache-Control", "max-age=0, s-maxage=31536000");

  res.json({ segment: segment(text) });
});

app.listen(8889, () => {
  console.log("running");
});
