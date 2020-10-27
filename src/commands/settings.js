"use strict";

module.exports = {
  name: "settings",
  aliases: ["configuration", "config", "set"],
  description: "Configure le bot par apport à la Guild",
  guildOnly: true,
  cooldown: 11,
  category: "config",
  async execute(
    client,
    { message, S_Guild: guildSettings, channel, member, args, guild }
  ) {
    if (!member.hasPermission("ADMINISTRATOR")) return false;
    if (!message.guild)
      return channel.send("Vous ne pouvez pas executer cette commande en MP !");

    const getSettings = args.shift();
    const newSettings = args.join(" ");
    switch (getSettings) {
      case "prefix":
        if (newSettings) {
          await client.updateGuild(message.guild, { prefix: newSettings });
          return channel.send(
            `Prefix mis à jour: \`${guildSettings.prefix}\` -> \`${newSettings}\``
          );
        }
        channel.send(`Prefix actuel: \`${guildSettings.prefix}\``);
        break;
      case "welcomeChannel":
        if (newSettings) {
          const choiceChannel =
            guild.channels.get(newSettings) ||
            message.mentions.channels.first() ||
            message.channels.find(c => c.name === newSettings);
          if (!choiceChannel)
            return channel.send(`Je ne trouve pas se channel: ${newSettings}`);
          await client.updateGuild(message.guild, {
            welcomeChannel: choiceChannel.id
          });
          return channel.send(
            `WelcomeChannel mis à jour: \`${guildSettings.welcomeChannel}\` -> \`${choiceChannel.name}\``
          );
        }
        channel.send(
          `welcomeChannel actuel: \`${guildSettings.welcomeChannel}\``
        );
        break;
      case "welcomeMessage":
        if (newSettings) {
          await client.updateGuild(message.guild, {
            welcomeMessage: newSettings
          });
          return channel.send(
            `WelcomeMessage mis à jour: \`${guildSettings.welcomeMessage}\` -> \`${newSettings}\``
          );
        }
        channel.send(
          `welcomeMessage actuel: \`${guildSettings.welcomeMessage}\``
        );
        break;
      case "logsChannel":
        if (newSettings) {
          const choiceChannel =
            guild.channels.get(newSettings) ||
            message.mentions.channels.first() ||
            message.channels.find(c => c.name === newSettings);
          if (!choiceChannel)
            return channel.send(`Je ne trouve pas se channel: ${newSettings}`);
          await client.updateGuild(message.guild, {
            logsChannel: choiceChannel.id
          });
          return channel.send(
            `logsChannel mis à jour: \`${guildSettings.logsChannel}\` -> \`${choiceChannel.name}\``
          );
        }
        channel.send(`logsChannel actuel: \`${guildSettings.welcomeChannel}\``);
        break;
      default:
        var AllSettings = "";
        for (const key in guildSettings) {
          if (
            [
              "prefix",
              "welcomeChannel",
              "welcomeMessage",
              "logsChannel"
            ].includes(key)
          ) {
            AllSettings += `**${key}**: actuellement \`${guildSettings[key]}\`\n`;
          }
        }
        channel.send(
          `Voici toute les configurations modifiable:\n${AllSettings}`
        );
        break;
    }
  }
};
