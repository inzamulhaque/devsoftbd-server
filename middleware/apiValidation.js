const verifyApiKey = async (req, res, next) => {
  try {
    const apiKey = req.headers?.apikey;
    if (apiKey !== process.env.API_KEY) {
      return res.status(400).json({
        status: false,
        error: "invalid api key",
      });
    }

    next();
  } catch (error) {
    res.status(400).json({
      status: false,
      error: "invalid api key",
    });
  }
};

module.exports = verifyApiKey;
