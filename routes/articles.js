const express = require("express");
const router = express.Router();
const articles = require("../db/articles");
const knex = require("../database/index");
articles.getUriTitle();

let error = "";
let success = "";

router.get("/search", (req, res) => {
  res.render("articles/search", { error: error });
  error = "";
});

router.get("/delete", (req, res) => {
  knex("articles")
    .returning()
    .orderBy("id", "asc")
    .then(results => {
      res.render("articles/delete", {
        articles: results,
        error: error,
        success: success
      });
      error = "";
      success = "";
    });
});

router.get("/new", (req, res) => {
  res.render("articles/add", { error: error });
  error = "";
});

router.get("/edit", (req, res) => {
  knex("articles")
    .returning()
    .orderBy("id", "asc")
    .then(results => {
      res.render("articles/edit", {
        articles: results,
        error: error
      });
      error = "";
    });
});

router.put("/edit", (req, res) => {
  knex("articles")
    .where("title", req.body.id)
    .update({
      title: req.body.title,
      author: req.body.author,
      body: req.body.body,
      url: encodeURI(req.body.title)
    })
    .returning("*")
    .then(results => {
      if (
        req.body.title === "" ||
        req.body.author === "" ||
        req.body.body === ""
      ) {
        throw err;
      } else {
        res.render("articles/article", { articles: results });
      }
    })
    .catch(err => {
      error = "Please fill in all fields";
      res.redirect("/articles/edit");
    });
});

router.delete("/delete", (req, res) => {
  let story = req.body.title;
  knex("articles")
    .where("title", story)
    .del()
    .then(results => {
      if (results == 0) {
        throw err;
      } else {
        success = "Successfully deleted article";
        res.redirect("/articles/delete");
      }
    })
    .catch(err => {
      error = "Could not find the article.";
      res.redirect("/articles/delete");
    });
});

router.get("/delete/:id", (req, res) => {
  let story = encodeURI(req.params.id);
  knex("articles")
    .where("url", story)
    .del()
    .then(results => {
      if (results == 0) {
        throw err;
      } else {
        success = "Successfully deleted article";
        res.redirect("/articles/delete");
      }
    })
    .catch(err => {
      error = "Could not find the article.";
      res.redirect("/articles/delete");
    });
});

router.get("/fetch", (req, res) => {
  let story = req.query.articleName;
  knex("articles")
    .where("title", story)
    .then(results => {
      if (story === "" || results == 0) {
        throw err;
      } else {
        res.render("articles/article", { articles: results });
      }
    })
    .catch(err => {
      error = "Could not find your article. Try again.";
      res.redirect("search");
    });
});

router.get("/:id", (req, res) => {
  let searchName = req.params.id;
  let story = encodeURI(searchName);
  knex("articles")
    .where("url", story)
    .then(results => {
      if (story === "" || results == 0) {
        throw err;
      } else {
        res.render("articles/article", { articles: results });
      }
    })
    .catch(err => {
      error = "Could not find your article. Try again.";
      res.redirect("search");
    });
});

router.post("/fetch", (req, res) => {
  let story = req.body;

  knex("articles")
    .insert({
      title: story.title,
      author: story.author,
      body: story.body,
      url: encodeURI(story.title)
    })
    .returning("*")
    .then(results => {
      if (story.title === "" || story.author === "" || story.body === "") {
        throw err;
      } else {
        res.render("articles/article", { articles: results });
      }
    })
    .catch(err => {
      error = "Please input all fields.";
      res.redirect("new");
    });
});

router.get("/", (req, res) => {
  knex
    .select("*")
    .from("articles")
    .orderBy("id", "asc")
    .then(results => {
      let goods = { articles: results };
      res.render("articles/index", goods);
    })
    .catch(err => {
      res.render("404");
    });
});

module.exports = router;
