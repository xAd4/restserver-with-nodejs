const search = (req, res) => {
  const { collection, term } = req.params;
  res.status(200).json({ collection, term });
};

module.exports = search;
