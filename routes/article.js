var express = require('express');
var router = express.Router();
var db = require("../models");


router.get("/articles", function(req, res) {
    // TODO: Finish the route so it grabs all of the articles
    db.Article.find({})
        .then(function (articles) {
            res.json(articles)
        }).catch(function (err) {
        res.json(err)
    })
});

router.get("/articles/:id", function(req, res) {
    db.Article.findById(req.params.id)
        .populate("comments")
        .then(function (dbArticles) {
            res.send(dbArticles);
        }).catch(function (error) {
        console.log(error);
    });
});

router.post("/articles/:id", function(req, res) {
    db.Comment.create(req.body)
        .then(function(dbComment) {
            return db.Article.findOneAndUpdate({_id: req.params.id},{ $push: { comments: dbComment._id } }, { new: true });
        })
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
});

module.exports = router;
