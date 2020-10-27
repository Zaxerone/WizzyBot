"use strict";

module.exports = {
  name: "help",
  aliases: ["aide", "h"],
  description: "Affiche toutes les commandes du bot !",
  cooldown: 5,
  category: "utile",
  execute(client, { message, member, args, channel, S_Guild }) {
    var embed = {
      title: "Commande help !",
      description: "",
      color: 0x3498db,
      thumbnail: {
        url: member.displayAvatarURL,
      },
      image: {
        url: client.botAvatar,
      },
      fields: [],
      timestamp: new Date(),
      footer: {
        text: client.user.tag,
        icon_url: client.botAvatar,
      },
    };

    if (args[0]) {
      var command = args.shift();
      var cmd;
      if (client.commands.has(command)) cmd = client.commands.get(command);

      if (!cmd)
        return channel.send(
          (embed.title = "Commande Invalide"),
          (embed.description = `Fait \`${S_Guild.prefix}help\` pour voir la liste des commandes`)
        );

      command = cmd;
      embed.title = `${
        command.name.slice(0, 1).toUpperCase() + command.name.slice(1)
      } command help`;
      embed.description = [
        `❯ **Commande:** ${
          command.name.slice(0, 1).toUpperCase() + command.name.slice(1)
        }`,
        `❯ **Description:** ${command.description || "Aucune description."}`,
        `❯ **Aliasses:** ${
          command.aliases ? command.aliases.join(", ") : "Aucun alias."
        }`,
        `❯ **Catégory:** ${
          command.category ? command.category : "General" || "Misc"
        }`,
      ].join("\n");

      return channel.send({ embed: embed });
    }
    embed.fields = [createHelp(client)];
    channel.send({ embed: embed });
  },
};

module.exports.createHelp = function (client) {
  var fields = [];
  var help = {};
  client.commands.forEach((command) => {
    const cat = command.category;
    if (!help.hasOwnProperty(cat)) help[cat] = [];
    help[cat].push(command);
  });
  for (const category in help) {
    fields[category] = [];
    fields[category].push({ name: category, description: help });
  }
  return fields;
};
