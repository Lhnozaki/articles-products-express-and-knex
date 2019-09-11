const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const productRouter = require("./routes/products");
const articleRouter = require("./routes/articles");
const app = express();
const methodOverride = require("method-override");
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.use(methodOverride("_method"));

// GET
app.get("/", (req, res) => {
  res.status(200).render("index");
});

// Routers
app.use("/products", productRouter);
app.use("/articles", articleRouter);

app.get("*", (req, res) => {
  res.status(404).render("404");
});

// Listen
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
