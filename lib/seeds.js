#! /usr/bin/env node

import { faker } from "@faker-js/faker";
import async from "async";
import mongoose from "mongoose";
import Comment from "./models/Comment";
import Post from "./models/Post";
import User from "./models/User";

console.log(
  "This script populates some test users, posts, comments to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

if (!userArgs[0].startsWith("mongodb")) {
  throw new Error(
    "ERROR: You need to specify a valid mongodb URL as the first argument"
  );
}

const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

let users = [];
let posts = [];
let comments = [];

function createRandomUser(callback) {
  const user = new User({
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    image: faker.image.avatar(),
  });
  user.save(function (err) {
    if (err) {
      callback(err);
      return;
    }
    console.log(`\nNew User: ${user}`);
    users.push(user);
    callback(null, user);
  });
}

function createRandomPost(i, callback) {
  const post = new Post({
    content: faker.lorem.paragraphs(),
    author: users[Math.floor(i / 2)],
  });
  post.save(function (err) {
    if (err) {
      callback(err);
      return;
    }
    console.log(`\nNew post: ${post}`);
    posts.push(post);
    callback(null, post);
  });
}

function createRandomComment(i, callback) {
  const comment = new Comment({
    content: faker.lorem.paragraph(),
    author: users[Math.floor(i / 3)],
    post: posts[Math.floor(i / 3)],
  });
  comment.save(function (err) {
    if (err) {
      callback(err);
      return;
    }
    console.log(`\nNew comment: ${comment}`);
    comments.push(comment);
    callback(null, comment);
  });
}

function createFriendsAndRequests(user, index, callback) {
  let friends = [];

  if (index < 3) {
    friends = users.slice(0, 3);
    friends = friends.slice(0, index).concat(friends.slice(index + 1));
    friendshipRequests = users.slice(0, index).concat(users.slice(index + 1));
    friendshipRequests = friendshipRequests.slice(3);
  } else {
    friends = users.slice(0, index).concat(users.slice(index + 1));
    friends = friends.slice(3);
    friendshipRequests = users.slice(0, 3);
    friendshipRequests = friendshipRequests
      .slice(0, index)
      .concat(friendshipRequests.slice(index + 1));
  }

  let newUser = new User({
    _id: user._id,
    name: user.name,
    image: user.image,
    friends: friends,
    friendshipRequests: friendshipRequests,
  });

  User.findByIdAndUpdate(user._id, newUser, {}, function (err) {
    if (err) {
      callback(err);
      return;
    }

    console.log(`\nAdded friends and friendship requests for user ${newUser}`);
  });
}

async.series(
  [
    (callback) =>
      async.each(
        [...Array(5).keys()],
        (index, cb) => createRandomUser(cb),
        callback
      ),
    (callback) =>
      async.each(
        [...Array(10).keys()],
        (index, cb) => createRandomPost(index, cb),
        callback
      ),
    (callback) =>
      async.each(
        [...Array(15).keys()],
        (index, cb) => createRandomComment(index, cb),
        callback
      ),
    (callback) =>
      async.forEachOf(
        [...users],
        (user, index, cb) => {
          createFriendsAndRequests(user, index, cb);
        },
        callback
      ),
  ],
  function (err, results) {
    if (err) console.log(`Final Error: ${err}`);

    mongoose.connection.close();
  }
);
