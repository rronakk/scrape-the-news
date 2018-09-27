var express = require('express');
var router = express.Router();
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

/* GET home page. */
router.get('/', function(req, res, next) {
    db.Article.find({})
        .then(function (articles) {
            res.render('index', { article: articles });
        }).catch(function (err) {
        res.json(err)
    });

});

// A GET route for scraping the echoJS website
router.get("/scrape", function(req, res) {
    // First, we grab the body of the html with request
    axios.get("https://www.thestreet.com/investing/stocks").then(function(response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);

        // Now, we grab every h2 within an article tag, and do the following:
        $(".news-list__body").each(function(i, element) {
            // Save an empty result object
            var result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this)
                .children("a").children("h3")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");
            result.summary = $(this)
                .children("p")
                .text();

            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
                .then(function(dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function(err) {
                    return res.json(err);
                });
            console.log(result)
        });
        res.send("Scrape Complete");
    });
});
module.exports = router;
