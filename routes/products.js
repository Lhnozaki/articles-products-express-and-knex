const express = require("express");
const router = express.Router();
const products = require("../db/products");
const knex = require("../database/index");

let error = "";
let success = "";

router.get("/search", (req, res) => {
  res.render("products/search", { error: error });
  error = "";
});

router.get("/delete", (req, res) => {
  res.render("products/delete", { error: error, success: success });
  error = "";
  success = "";
});

router.get("/new", (req, res) => {
  res.render("products/add", { error: error });
  error = "";
});

router.get("/edit", (req, res) => {
  knex
    .select("*")
    .from("products")
    .orderBy("id", "asc")
    .then(results => {
      res.render("products/edit", {
        products: results,
        error: error
      });
      error = "";
    });
});

router.put("/edit", (req, res) => {
  let itemID = parseInt(req.body.id);
  let itemName = req.body.name;
  let itemPrice = parseInt(req.body.price);
  let itemInventory = parseInt(req.body.inventory);

  knex("products")
    .where("id", itemID)
    .update({
      name: itemName,
      price: itemPrice,
      inventory: itemInventory
    })
    .returning("*")
    .then(results => {
      if (
        req.body.name === "" ||
        req.body.price === "" ||
        req.body.inventory === ""
      ) {
        throw err;
      } else {
        res.render("products/product", { products: results });
      }
    })
    .catch(err => {
      error = "Please fill in all fields";
      res.redirect("/products/edit");
    });
});

router.delete("/delete", (req, res) => {
  let itemID = parseInt(req.body.id);

  knex("products")
    .where("id", itemID)
    .del()
    .then(results => {
      console.log(results);
      if (itemID === "" || results == 0) {
        throw err;
      } else {
        success = "Successfully Deleted!";
        res.redirect("/products/delete");
      }
    })
    .catch(err => {
      error = "Could not find your product. Try again.";
      res.redirect("/products/delete");
    });
});

router.delete("/delete/:id", (req, res) => {
  let itemID = parseInt(req.params.id);
  let goods = products.filterTheGoods(itemID);

  if (itemID === "" || goods == false) {
    error = "Could not find your product. Try again.";
    res.redirect("/products/delete");
  } else {
    products.deleteTheGoods(itemID);
    success = "Successfully Deleted!";
    res.redirect("/products/delete");
  }
});

router.get("/delete/:id", (req, res) => {
  let itemID = parseInt(req.params.id);
  let goods = products.filterTheGoods(itemID);

  if (itemID === "" || goods == false) {
    error = "Could not find your product. Try again.";
    res.redirect("/products/delete");
  } else {
    products.deleteTheGoods(itemID);
    success = "Successfully Deleted!";
    res.redirect("/products/delete");
  }
});

router.get("/fetch", (req, res) => {
  let searchID = req.query.id;
  let goods = products.filterTheGoods(searchID);

  if (searchID === "" || goods == false) {
    error = "Could not find your product. Try again.";
    res.redirect("search");
  } else {
    res.render("products/product", { products: goods });
  }
});

router.get("/:id", (req, res) => {
  let searchID = req.params.id;
  let goods = products.filterTheGoods(searchID);

  if (searchID === "" || goods == false) {
    error = "Could not find your product. Try again.";
    res.redirect("search");
  } else {
    res.render("products/product", { products: goods });
  }
});

router.post("/new", (req, res) => {
  let item = req.body;
  if (item.name !== "" && item.price !== "" && item.inventory !== "") {
    let newItem = products.addToGoods(item.name, item.price, item.inventory);
    let goods = products.filterTheGoods(newItem.id);

    res.render("products/product", { products: goods });
  } else {
    error = "Please input all fields.";
    res.redirect("new");
  }
});

router.get("/", (req, res) => {
  knex
    .select("*")
    .from("products")
    .orderBy("id", "asc")
    .then(results => {
      let goods = { products: results };
      res.render("products/index", goods);
    })
    .catch(err => {
      res.render("404");
    });
});

module.exports = router;
