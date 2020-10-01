const { allowCors } = require("../../util");
const cedict = require("../../data/cedict_1_0_ts_utf-8_mdbg.json");

const KEYS = {
  SIMPLIFIED: 0,
  TRADITIONAL: 1,
  PINYIN: 2,
  ENTRIES: 3,
  DEFINITIONS: 4,
  RANK: 5,
};

export default allowCors((req, res) => {
  const {
    query: { word },
  } = req;

  const entry = cedict[word];

  if (entry == null) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.json({
    simplified: entry[KEYS.SIMPLIFIED],
    rank: entry[KEYS.RANK],
    entries: entry[KEYS.ENTRIES].map((en) => {
      return {
        traditional: en[KEYS.TRADITIONAL],
        pinyin: en[KEYS.PINYIN],
        definitions: en[KEYS.DEFINITIONS],
      };
    }),
  });
});
