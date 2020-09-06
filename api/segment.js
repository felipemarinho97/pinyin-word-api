const { segment } = require("hanzi-tools");
const { allowCors } = require("../util");

export default allowCors((req, res) => {
  const {
    body: { text },
  } = req;

  res.json({ segment: segment(text) });
});
