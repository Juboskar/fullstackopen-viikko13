const errorHandler = (error, req, res, next) => {
  console.log(error);

  if (error.name === "ValueError") {
    return res.status(400).json({ error: error.message });
  }
  if (error.name === "NotFoundError") {
    return res.status(404).json({ error: error.message });
  }
  if (error.name === "NotUniqueError") {
    return res.status(400).json({ error: error.message });
  }
  return res.status(500).json({ error: "Unknown error occurred" });
};

module.exports = errorHandler;
