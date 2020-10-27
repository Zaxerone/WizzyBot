"use strict";

const { Collection } = require("discord.js");

module.exports = async (client, message) => {
  if (message.author.bot) return false;
  const guildSettings = await client.getGuild(message.guild);
  const userSettings = await client.getUser(message.author);

  if (!guildSettings) {
    console
      .error(
        "Impossible de trouver les configurations sur la guilde, essaie de création ..."
      )
      .then(() =>
        client.createGuild({
          guildID: message.guild.id,
          guildName: message.guild.name,
        })
      );
    return;
  }
  if (
    client.maintenance == true &&
    message.author.id !== "744209270295494697"
  ) {
    if (message.content.startsWith(guildSettings.prefix)) {
      return message.channel.send("Le bot est en maintenance!");
    }
  }

  /** XP system */
  var GuildSearch = await userSettings.guildData.find(
    (g) => g.guildID === message.guild.id
  );
  if (!GuildSearch) {
    let arrayData = await userSettings.guildData;
    let OBJpush = await Object.assign({
      guildID: message.guild.id,
      guildName: message.guild.name,
      messageSize: 1,
    });
    await arrayData.push(OBJpush);
    client.updateUser(message.author, { guildData: arrayData });
  } else {
    let arrayData = userSettings.guildData;
    let objIndex = arrayData.findIndex(
      (obj) => obj.guildID === message.guild.id
    );
    const a = (arrayData[objIndex].messageSize =
      arrayData[objIndex].messageSize + 1);
    client.updateUser(message.author, { guildData: arrayData });
  }

  var args;
  if (
    message.content
      .toLowerCase()
      .indexOf(guildSettings.prefix.toLowerCase()) === 0
  ) {
    args = message.content
      .slice(guildSettings.prefix.length)
      .trim()
      .split(/ +/g);
  } else if (
    message.content.replace("<@!", "<@").indexOf(client.user.toString()) === 0
  ) {
    args = message.content
      .slice(client.user.toString().length)
      .trim()
      .split(/ +/g);
    args.shift();
  } else if (message.content.toLowerCase().indexOf(client.user.tag) === 0) {
    args = message.content.slice(client.user.tag.length).trim().split(/ +/g);
  } else if (message.content.toLowerCase().indexOf(client.user.tag) === 0) {
  } else if (message.content.indexOf(client.user.username) === 0) {
    args = message.content
      .slice(client.user.username.length)
      .trim()
      .split(/ +/g);
  } else return false;
  const commandName = args.shift().toLowerCase();
  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );
  if (!command) return false;
  var cooldowns = client.cooldowns;
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  if (command.guildOnly && message.channel.type !== "text") {
    return message.reply("Vous ne pouvez pas executer cette commande en DM");
  }

  command.execute(client, {
    message: message,
    args: args,
    guild: message.guild,
    member: message.member,
    user: message.author,
    channel: message.channel,
    S_Guild: guildSettings,
    S_User: userSettings,
  });
};
