const express = require("express");
const assert = require("assert");
const router = express.Router();
const request = require("request");



function getTagTopFollowers(tag, callback) {
    request("https://www.instagram.com/explore/tags/" + tag + "/?__a=1",
        function (error, response, body) {
            if (error) {
                console.log(error);
            }
            if (!error && response.statusCode == 200) {
                if (JSON.parse(body).graphql) {
                    let result=JSON.parse(body).graphql.hashtag.edge_hashtag_to_top_posts.edges;
                    topPosts=[];
                    hashtags={};
                    result.forEach((val)=>{
                        let topPost={src:val.node.display_url, id: val.node.id, hashtags:""};
                        let text=val.node.edge_media_to_caption.edges[0].node.text;
                        for (let w of text.split(" ")){
                            if (w.startsWith("#")){
                                topPost.hashtags+=w;
                                if(!(w in hashtags)){
                                    hashtags[w]=0;
                                }
                                else{
                                    hashtags[w]+=1;
                                }
                            }
                        }
                    });
                    let tags=[];
                    for (let tag in hashtags){
                        tags.push({
                            tag:tag,
                            count:hashtags[tag]
                        })
                    }
                    tags.sort(function(a,b){
                        return (a.count- b.count);
                    });
                    let ret={topPosts: topPosts, tags:tags};
                    callback(JSON.parse(ret));
                }
                else {
                    callback([]);
                }
            }
        });
}

/* GET hashtag. */
router.get("/topPosts/:tag", function(req, res) {
  console.log(req.params);
  getTagTopFollowers(
    req.params.tag,
    (best) => res.send(best)
  );
});

module.exports = router;
