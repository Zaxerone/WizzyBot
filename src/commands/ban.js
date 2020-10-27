"use strict";

module.exports = {
  name: "ban",
  description: "Bannir un membre du serveur",
  aliases: ["bannir"],
  cooldown: 5,
  category: "moderation",
  execute(client, { args, guild, member, channel, message }) {
    if (!member.hasPermission("BAN_MEMBERS"))
      return channel.send("Vous n'avez pas la permission à cette commande!");
    if (!message.guild)
      return channel.send("Vous ne pouvez pas executer cette commande en MP !");
    if (!guild.me.hasPermission("BAN_MEMBERS"))
      return channel.send(
        "Je n'ai pas la permission de supprimer les messages!"
      );

    var toBan = args.shift();
    if (!toBan)
      return channel.send("Veuillez mentionner le membre ou mettre son ID");
    else
      toBan =
        client.users.find(user => user.username === toBan) ||
        client.users.get(toBan) ||
        message.mentions.users.first();
    if (!toBan) {
      messageLoading.delete({ timeout: 0 });
      throw TypeError(
        `L'utilisateur n'à pas pu être selectionné ! -args > ${toBan} toBan`
      );
    }

    const toBanID = toBan.id;

    var modifiedArgs = message.content.split(" ");
    var delay = modifiedArgs.slice(1)[1];

    if (!delay) {
      guild.member(toBan).ban(reason);
      channel.send(`${toBan} a bien été banni!`);
    } else {
      guild.member(toBan).ban(reason);
      if (delayResolver == false)
        return channel.send(
          "Veuillez définir un temps correcte (s, m, h, d, w)"
        );
      channel.send(`${toBan} a bien été banni!`);
      setTimeout(() => {
        guild.members
          .unban(toBanID)
          .then(() => channel.send(`${toBan} a bien été débanni!`));
      }, delayResolver(delay));
    }
  }
};

function delayResolver(delay) {
  const converted = String(delay.slice(0, 1));
  var result;

  if (delay.includes("s")) {
    result = converted * 1000;
  } else if (delay.includes("m")) {
    result = converted * 60000;
  } else if (delay.includes("h")) {
    result = converted * 3600000;
  } else if (delay.includes("d")) {
    result = converted * 86400000;
  } else if (delay.includes("w")) {
    result = converted * 604800000;
  } else return false;

  return result;
}
