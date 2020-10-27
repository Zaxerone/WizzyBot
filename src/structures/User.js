"use strict";

const mongoose = require("mongoose");

const userShema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userID: String,
  userName: String,
  rep: Number,
  money: Number,
  guildData: Array
});

module.exports = mongoose.model("User", userShema);
