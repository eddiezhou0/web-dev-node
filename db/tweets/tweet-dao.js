const model = require('./tweet-model');

const findAllTweets = () =>
    model.find();

const findTweetById = (id) =>
    model.findById(id);

const createTweet = (tweet) =>
    model.create(tweet);

const deleteTweet = (id) =>
    model.deleteOne({_id: id});

const updateTweet = (id, tweet) =>
    model.updateOne({_id: id}, {$set: tweet});

module.exports = {
    findAllTweets, createTweet, deleteTweet, updateTweet, findTweetById
};
