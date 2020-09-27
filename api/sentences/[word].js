const axios = require("axios");
const cheerio = require("cheerio");

const { allowCors } = require("../../util");

export default allowCors((req, res) => {
  const {
    query: { word, includeAudio, level },
  } = req;

  axios
    .get(`https://chinesepod.com/dictionary/english-chinese/${encodeURI(word)}`)
    .then((_res) => {
      const sentences = [];
      const body = _res.data + "";
      const $ = cheerio.load(body);

      const rows = $(".table.table-striped.table-grossary tr");

      rows.each((i, e) => {
        let text = $(e.childNodes[1])
          .text()
          .split("\t")
          .filter((e) => !e.trim().match(/(^$|\n)/))
          .map((e) => e.trim());
        let audio;

        e.childNodes[3].children.forEach((child) => {
          if (child.name == "script") {
            try {
              audio = child.children[0].data.match(/http.*mp3/)[0];
            } catch {}
          }
        });

        const level = $(e.childNodes[5].children[1]).text();

        const [hanzi, pinyin, translation] = [...text];

        sentences.push({ hanzi, pinyin, translation, audio, level });
      });

      res.json(
        sentences
          .filter((s) =>
            includeAudio ? (s.audio != null) == includeAudio : true
          )
          .filter((s) => (level ? level == s.level : true))
      );
    });
});
