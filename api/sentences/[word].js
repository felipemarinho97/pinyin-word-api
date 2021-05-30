const axios = require("axios");
const cheerio = require("cheerio");

const { allowCors } = require("../../util");

export default allowCors((req, res) => {
  const {
    query: { word, includeAudio, level },
  } = req;

  axios
    .get(`https://www.chinesepod.com/dictionary/${encodeURI(word)}`)
    .then((_res) => {
      const sentences = [];
      const body = _res.data + "";
      const $ = cheerio.load(body);

      let code = $("body > script")
        .html()
        .replace(/^(.*?)=/, "");

      let data = eval(code);

      data.data[0].sampleSentenceList.forEach((e) => {
        console.log(e, data.data[0].sampleSentenceList);
        sentences.push({
          hanzi: e.simplified,
          pinyin: e.pinyin,
          translation: e.english,
          audio: e.audioUrl,
          level: e.lessonInfo.level,
        });
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
