const axios = require("axios");
const keys = require("./config/keys");

module.exports = axios.default.create({
  baseURL: "https://favqs.com/api",
  headers: { Authorization: `Token token=${keys.FAVQS_API_TOKEN}` }
});
