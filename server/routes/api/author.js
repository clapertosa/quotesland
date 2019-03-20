const express = require("express");
const router = express.Router();
const axios = require("../../axiosWiki");

router.post("/", async (req, res) => {
  try {
    let result = await axios.get("", {
      params: {
        action: "query",
        format: "json",
        prop: "images|pageimages|extracts",
        titles: req.body.name,
        imlimit: 500,
        exintro: 1,
        explaintext: 1
      }
    });

    if (
      !result.data.query.pages[Object.keys(result.data.query.pages)[0]].extract
    ) {
      result = await axios.get("", {
        params: {
          action: "query",
          format: "json",
          prop: "images|pageimages|extracts",
          titles: req.body.name.substring(0, req.body.name.indexOf(" ") + 1),
          imlimit: 500,
          exintro: 1,
          explaintext: 1
        }
      });
    }
    return res.json(result.data);
  } catch (error) {
    return res.status(error.response.status).json({
      message: "An error occurred",
      error: error.response.statusText
    });
  }
});

module.exports = router;
