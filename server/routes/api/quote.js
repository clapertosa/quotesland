const express = require("express");
const router = express.Router();
const axios = require("../../axiosFavqs");

const QUOTES_PER_PAGE = 25;

router.post("/", async (req, res) => {
  const pagesNumber = Math.ceil(req.body.quotes / QUOTES_PER_PAGE);
  const page = Math.floor(Math.random() * (pagesNumber - 1));
  const { author } = req.body;

  try {
    const results = author
      ? await axios.get("/quotes", {
          params: { filter: author, type: "author", page }
        })
      : await axios.get("/quotes");
    return res.status(200).json({
      result:
        results.data.quotes[
          Math.floor(Math.random() * (results.data.quotes.length - 0))
        ]
    });
  } catch (error) {
    return res.status(error.response.status).json({
      message: "An error occurred",
      error: error.response.statusText
    });
  }
});

module.exports = router;
