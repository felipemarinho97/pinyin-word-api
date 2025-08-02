const axios = require("axios");

const { allowCors } = require("../../util");

export default allowCors((req, res) => {
  const {
    query: { word, includeAudio, level },
  } = req;

  axios
    .get(`https://www.chinesepod.com/api/v1/search/search-dictionary/?query=${encodeURI(word)}&skip=0`)
    .then((_res) => {
      
      const sentences = [];
      if (_res.data.count === 0) {
        res.status(404).send("No sentences found for the given word.");
        return;
      }

      _res.data.results.forEach((e) => {
        sentences.push({
          hanzi: e.simplified,
          pinyin: e.pinyin,
          translation: e.definitions[0],
          definition: e.definition,
          definitions: e.definitions,
          audio: e.audioUrl,
          level: e.hsk,
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
