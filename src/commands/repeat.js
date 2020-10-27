"use strict";

module.exports = {
  name: "repeat",
  aliases: [],
  description: "Repete ce que l'utilisateur dit",
  guildOnly: true,
  cooldown: 5,
  category: "fun",
  execute(client, { message, args, channel }) {
    if (args.join(" ") == "")
      return channel.send("Veuillez définir un message");
    channel.send(args.join(" ")).then(() => message.delete({ timeout: 0 }));
  }
};
