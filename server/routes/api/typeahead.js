const express = require("express");
const router = express.Router();
const axios = require("../../axiosFavqs");

router.post("/", async (req, res) => {
  try {
    const results = await axios.get("/typeahead");
    return res.status(200).json({ results: results.data.authors });
  } catch (error) {
    return res.status(error.response.status).json({
      message: "An error occurred",
      error: error.response.statusText
    });
  }
});

module.exports = router;
