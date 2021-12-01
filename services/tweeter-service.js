const dao = require('../db/tweets/tweet-dao');

module.exports = (app) => {

    const findAllTweets = (req, res) =>
        dao.findAllTweets()
            .then(tweets => res.json(tweets));

    app.get('/api/tweets', findAllTweets);

    const postNewTweet = (req, res) => {
        const newTweet = {
            "topic": "Web Development",
            "userName": "ReactJS",
            "verified": false,
            "handle": "ReactJS",
            "time": "2h",
            "avatar-image": "../../../images/react.png",
            "logo-image": "../../../images/react.png",
            "stats": {
                "comments": 123,
                "retweets": 234,
                "likes": 345
            },
            ...req.body,
        }
        dao.createTweet(newTweet).then(a => res.json(a));
    }

    app.post('/api/tweets', postNewTweet);

    const deleteTweet = (req, res) =>
        dao.deleteTweet(req.params.id)
            .then((status) => res.send(status));

    app.delete('/api/tweets/:id', deleteTweet);

    const likeTweet = (req, res) => {
        const id = req.params['id'];
        let tweet = dao.findTweetById(id)
            .then(tweet => {
                console.log(tweet);
                if (tweet.liked === true) {
                    tweet.liked = false;
                    tweet.stats.likes--;
                } else {
                    tweet.liked = true;
                    tweet.stats.likes++;
                }
                dao.updateTweet(id, tweet)
                    .then(status => res.send(status))
            });
    }

    app.put('/api/tweets/:id/like', likeTweet);

};
