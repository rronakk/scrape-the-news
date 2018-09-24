var express = require('express');
var router = express.Router();
var db = require("../models");

router.get("/comments", function(req, res) {
    // TODO: Finish the route so it grabs all of the articles
    db.Comment.find({})
        .then(function (comments) {
            res.json(comments)
        }).catch(function (err) {
        res.json(err)
    })
});

// Select just one comment by an id
router.get("/comment/:id", function(req, res) {
    db.Comment.findById(req.params.id)
        .then(function (comment) {
            res.json(comment)
        }).catch(function (err) {
            res.json(err)
    });
});

// Update just one comment by an id
router.post("/comment/:id", function(req, res) {
    // Update the note that matches the object id
    db.Comment.findOneAndUpdate({_id: req.params.id},{ $set: { body: req.body.body, title: req.body.title } }, { new: true })
        .then(function (comment) {
            res.json(comment);
        }).catch(function (err) {
        res.json(err);
    });
});

// Delete One from the DB
router.get("/delete/comment/:id", function(req, res) {
    db.Comment.findByIdAndRemove(req.params.id)
        .then(function (comment) {
            var response = {
                message: "comment successfully deleted",
                id: req.params.id
            };
            res.status(200).send(response);
        }).catch(function (err) {
        res.json(err);
    });
});

module.exports = router;
