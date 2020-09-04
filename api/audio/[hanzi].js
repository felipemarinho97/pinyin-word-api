const axios = require("axios");
var request = require("request");

const YABLA_URI =
  "https://chinese.yabla.com/chinese-english-pinyin-dictionary.php";

const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

export default allowCors((req, res) => {
  const {
    query: { pinyin },
  } = req;

  axios.get(`${YABLA_URI}?define=${encodeURI(pinyin)}`).then((_res) => {
    const URI = (_res.data + "").match(/https.*\.mp3/)[0];
    req.pipe(request(URI)).pipe(res);
  });
});
