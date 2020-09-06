const axios = require("axios");
const request = require("request");
const { allowCors } = require("../../util");

const HSK_ACADEMY = "https://hsk.academy/en/words/";
const HSK_ACADEMY_CHAR = "";

const sources = [
  {
    name: "AllSetLearning",
    uri: "https://resources.allsetlearning.com/chinese/grammar/",
  },
  {
    name: "HSK Academy",
    uri: "https://hsk.academy/en/words/",
  },
  {
    name: "HSK Academy",
    uri: "https://hsk.academy/en/characters/",
  },
  {
    name: "Wikitionary",
    uri: "https://en.wiktionary.org/wiki/",
  },
];

let counter = Object.keys(sources).length;

function respond(counter, res, obj) {
  if (counter == 0) res.json(obj);
}

export default allowCors((req, res) => {
  const {
    query: { hanzi },
  } = req;
  const hanzi_encoded = encodeURI(hanzi);

  let obj = {};

  for (const source of sources) {
    const link = source.uri;

    axios
      .head(`${link}${hanzi_encoded}`)
      .then((r) => {
        if (r.status >= 200 || status < 300) {
          obj[source.name] = `${link}${hanzi_encoded}`;
        }
        respond(--counter, res, obj);
      })
      .catch(() => {
        respond(--counter, res, obj);
      });
  }
});
