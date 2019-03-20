const express = require("express");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dir: "client", dev });
const nextHandler = app.getRequestHandler();

const body = require("body-parser");
const helmet = require("helmet");
const compression = require("compression");

// API Routes
const quoteRoute = require("./routes/api/quote");
const typeaheadRoute = require("./routes/api/typeahead");
const authorRoute = require("./routes/api/author");

app.prepare().then(() => {
  const server = express();

  server.use(body.urlencoded({ extended: true }));
  server.use(body.json());
  server.use(helmet());
  server.use(compression());

  // Routes
  server.use("/api/quote", quoteRoute);
  server.use("/api/typeahead", typeaheadRoute);
  server.use("/api/author", authorRoute);

  server.get("*", (req, res) => {
    return nextHandler(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log("> Ready");
  });
});
