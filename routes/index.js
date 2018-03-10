const express = require("express");
const assert = require("assert");
const router = express.Router();
const request = require("request");
const MongoClient = require("mongodb").MongoClient;


// Connection URL
const url = process.env.MONGODB_URI;;


function getTagTopFollowers(tag, callback) {
    request("https://www.instagram.com/explore/tags/" + tag + "/?__a=1",
        function (error, response, body) {
            if (error) {
                console.log(error);
            }
            if (!error && response.statusCode == 200) {
                let jBody = JSON.parse(body);
                if (jBody.graphql && jBody.graphql.hashtag && jBody.graphql.hashtag.edge_hashtag_to_top_posts && jBody.graphql.hashtag.edge_hashtag_to_top_posts.edges) {
                    let result = jBody.graphql.hashtag.edge_hashtag_to_top_posts.edges;
                    let topPosts = [];
                    let hashtags = {};
                    result.forEach((val) => {
                        let topPost = {src: val.node.display_url, id: val.node.id, hashtags: "", count: 0};
                        let text = "";
                        if (val.node.edge_media_to_caption.edges[0]) {
                            text = val.node.edge_media_to_caption.edges[0].node.text;
                        }

                        for (let w of text.split(" ")) {
                            if (w.startsWith("#")) {
                                topPost.hashtags += w + " ";
                                if (w !== "#" + tag) {
                                    if (!(w in hashtags)) {
                                        hashtags[w] = 1;
                                    }
                                    else {
                                        hashtags[w] += 1;
                                    }
                                }
                            }
                        }
                        topPosts.push(topPost);
                    });
                    let tags = [];
                    for (let tag in hashtags) {
                        tags.push({
                            tag: tag,
                            count: hashtags[tag]
                        })
                    }
                    tags.sort(function (a, b) {
                        return (b.count - a.count);
                    });
                    tags = tags.slice(0, 10);

                    topPosts.forEach((post) => {
                        tags.forEach((tag) => {
                            if (post.hashtags.includes(tag.tag)) {
                                post.count += 1;
                            }
                        });
                    });
                    let ret = {topPosts: topPosts, tags: tags};

                    callback(ret);
                }
                else {
                    callback([]);
                }
            }
        });
}

function insertSearch(db, tag) {
    const dbase = db.db("tagsExam"); //here
    // Get the documents collection
    let collection = dbase.collection("tags");
    try {
        collection.insertOne({tag: tag, date: new Date()});
    }
    catch (err) {
        dbase.createCollection("tags", {size: 2148});
        collection = dbase.collection("tags");
        collection.insertOne({tag: tag, date: new Date()});
    }
}

function searchHistory(db, limit, callback) {
    const dbase = db.db("tagsExam"); //here
    // Get the documents collection
    let collection = dbase.collection("tags");
    if (Number(limit)) {
        collection.find().toArray(function (err, docs) {
            assert.equal(err, null);
            console.log("Found " + docs.length + " records");
            // console.log(docs);
            docs.sort((a, b) =>
                (b.date - a.date)
            );
            docs.slice(0, limit + 1);
            callback(docs);
        });
    }
    else {
        callback([]);
    }
}

/* GET hashtag. */
router.get("/topPosts/:tag", function (req, res) {
    console.log(req.params);
    getTagTopFollowers(
        req.params.tag,

        (best) => {
            MongoClient.connect(url, function (err, client) {
                    assert.equal(null, err);
                    console.log("Connected successfully to server");
                    insertSearch(client, req.params.tag);
                    res.send(best);
                }
            );
        })
});

/* GET history. */
router.get("/history/:limit", function (req, res) {
    console.log(req.params);

    MongoClient.connect(url, function (err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
            searchHistory(client, req.params.limit, (docs) => {
                res.send(docs)
            });
        }
    );

});

module.exports = router;
