const dao = require('../db/tweets/tweet-dao');

module.exports = (app) => {

    const findAllTweets = (req, res) =>
        dao.findAllTweets()
            .then(tweets => res.json(tweets));

    app.get('/api/tweets', findAllTweets);

    const postNewTweet = (req, res) => {
        const newTweet = {
            _id: (new Date()).getTime() + '',
            "topic": "Web Development",
            "userName": "ReactJS",
            "verified": false,
            "handle": "ReactJS",
            "time": "2h",
            "avatar-image": "../../../images/react-blue.png",
            "logo-image": "../../../images/react-blue.png",
            "stats": {
                "comments": 123,
                "retweets": 234,
                "likes": 345
            },
            ...req.body,
        }
        dao.createTweet(newTweet);
        res.json(newTweet);
    }

    app.post('/api/tweets', postNewTweet);

    const deleteTweet = (req, res) => {
        const id = req.params['id'];
        dao.deleteTweet(id);
        res.sendStatus(200);
    }

    app.delete('/api/tweets/:id', deleteTweet);

    const likeTweet = (req, res) => {
        const id = req.params['id'];
        let tweet = dao.findById(id);
        if (tweet.liked === true) {
            tweet.liked = false;
            tweet.stats.likes--;
        } else {
            tweet.liked = true;
            tweet.stats.likes++;
        }
        dao.updateTweet(id, tweet);
        res.sendStatus(200);
    }

    app.put('/api/tweets/:id/like', likeTweet);

};
