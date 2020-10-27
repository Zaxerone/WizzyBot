"use strict";

const mongoose = require("mongoose");
const { Guild, User } = require("./../structures");

module.exports = client => {
  client.getGuild = async guild => {
    const data = await Guild.findOne({ guildID: guild.id });
    if (data) return data;
    return client.config.DEFAULTSETTINGS;
  };

  client.updateGuild = async (guild, settings) => {
    let data = await client.getGuild(guild);
    if (typeof data !== "object") data = {};
    for (const key in settings) {
      if (data[key] !== settings[key]) data[key] = settings[key];
    }
    return data.updateOne(settings);
  };

  client.createGuild = async guild => {
    const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, guild);
    const createGuild = await new Guild(merged);
    createGuild.save().then(g => console.log(`New guild -> ${g.guildName}`));
  };

  client.getUser = async user => {
    const data = await User.findOne({ userID: user.id });
    if (data) return data;
    await client.createUser({
      userID: user.id,
      userName: user.username,
      guildData: [],
      rep: 0,
      money: 100
    });
    return await User.findOne({ userID: user.id });
  };

  client.updateUser = async (user, settings) => {
    let data = await client.getUser(user);
    if (typeof data !== "object") data = {};
    for (const key in settings) {
      if (data[key] !== settings[key]) data[key] = settings[key];
    }
    return data.updateOne(settings);
  };

  client.createUser = async user => {
    const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, user);
    const createUser = await new User(merged);
    await createUser.save().then(u => console.log(`New user -> ${u.userName}`));
    return false;
  };
};
