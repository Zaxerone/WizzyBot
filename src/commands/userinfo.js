"use strict";

module.exports = {
  name: "userinfo",
  aliases: ["ui"],
  description: "envoie les informations d'un membre",
  guildOnly: false,
  cooldown: 5,
  category: "utile",
  async execute(client, { message, channel, member, user, args }) {
    var userSearch = args.shift();
    if (!userSearch) userSearch = user;
    else
      userSearch =
        client.users.find(user => user.username === userSearch) ||
        client.users.get(userSearch) ||
        message.mentions.users.first() ||
        user;
    if (!userSearch) {
      message.delete({ timeout: 0 });
      throw TypeError(
        `L'utilisateur n'à pas pu être selectionné ! -args > ${userSearch} userSearch`
      );
    }

    var userPresence = userSearch.presence.game;
    if (!userPresence) userPresence = "Aucun jeu";

    var Callback = {
      roles: await message.guild
        .member(userSearch)
        .roles.map(role => role.name)
        .join(", ")
        .replace("@everyone, ", ""),
      statut: () => {
        const displayStatus = userSearch.presence.status;
        switch (displayStatus) {
          case "dnd":
            return "Ne pas déranger";
            break;
          case "idle":
            return "Inactif";
            break;
          case "online":
            return "En ligne";
            break;
          case "offline":
            return "Hors ligne";
            break;
        }
      }
    };
    channel
      .send({
        embed: {
          title: userSearch.tag + " - " + userSearch.id,
          color: 0xf1c40f,
          thumbnail: {
            url: userSearch.displayAvatarURL()
          },
          fields: [
            {
              name: "Nom d'utilisateur",
              value: userSearch.username,
              inline: true
            },
            {
              name: "Dicriminateur",
              value: "#" + userSearch.discriminator,
              inline: true
            },
            {
              name: "Nickname",
              value: message.guild.member(userSearch).nickname,
              inline: true
            },
            {
              name: "Jeux",
              value: userPresence,
              inline: true
            },
            {
              name: "Statut",
              value: Callback.statut()
            },
            {
              name: "Compte créé le",
              value: toLocalDate(userSearch.createdTimestamp),
              inline: true
            },
            {
              name: "A rejoint le",
              value: toLocalDate(
                message.guild.member(userSearch).joinedTimestamp
              ),
              inline: true
            },
            {
              name: "Rôles",
              value: Callback.roles
            }
          ],
          timestamp: new Date(),
          footer: {
            text: client.user.tag,
            icon_url: client.botAvatar
          }
        }
      })
      .catch(console.error);
  }
};

function toLocalDate(timestamp) {
  var date, days, months, years, hours, minutes, seconds, milliseconds;
  date = new Date(timestamp);
  days = String(date.getDay());
  months = String(date.getMonth());
  years = String(date.getFullYear());
  hours = String(date.getHours());
  minutes = String(date.getMinutes());
  seconds = String(date.getSeconds());
  milliseconds = String(date.getMilliseconds());
  return `${days}/${months}/${years} ${hours}:${minutes}:${seconds}:${milliseconds}`;
}
