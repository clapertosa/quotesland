const axios = require("axios");

module.exports = axios.default.create({
  baseURL: "https://en.wikipedia.org/w/api.php"
});
