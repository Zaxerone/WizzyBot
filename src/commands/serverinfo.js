"use strict";

module.exports = {
  name: "serverinfo",
  aliases: ["si"],
  description: "envoie les informations du serveur",
  guildOnly: false,
  cooldown: 5,
  category: "utile",
  async execute(client, { channel, guild }) {
    var Callback = {
      roles: await guild.roles,
      emotes: await guild.emojis
    };
    channel
      .send({
        embed: {
          title: guild.name + " - " + guild.id,
          color: 0x7289da,
          thumbnail: {
            url: guild.iconURL()
          },
          description: guild.description,
          fields: [
            {
              name: "AFK channel",
              value: guild.afkChannel
                ? guild.afkChannel.name + " - " + guild.afkChannel.id
                : "Pas de salon AFK",
              inline: true
            },
            {
              name: "Roles",
              value: getRoles(Callback),
              inline: true
            },
            {
              name: "Emotes",
              value: getEmotes(Callback),
              inline: true
            },
            {
              name: "Owner",
              value: guild.owner.toString(),
              inline: true
            },
            {
              name: "Créé le",
              value: toLocalDate(guild.createdTimestamp),
              inline: true
            },
            {
              name: "Vous avez rejoint le",
              value: toLocalDate(guild.joinedTimestamp),
              inline: true
            },
            {
              name: "Personnes",
              value: `Actuellement le discord à ${guild.members.size} membres`,
              inline: true
            },
            {
              name: "Privilège",
              value: `Partenaire: **${
                guild.partnered ? "oui" : "non"
              }** | Boost lvl: **${guild.verificationLevel}** | Vérifié: **${
                guild.verified ? "oui" : "non"
              }**`,
              inline: true
            }
          ],
          image: {
            url: guild.bannerURL()
          },
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

function getEmotes(Callback) {
  var result;
  if (Callback.emotes.length > 5) {
    result =
      Callback.emotes
        .map(emotes => emotes)
        .slice(0, 9)
        .join(" ") + " ...";
  } else {
    result = Callback.emotes
      .map(emotes => emotes)
      .slice(0, 9)
      .join(" ");
  }
  if (!result) result = "Aucun émote";
  return result;
}

function getRoles(Callback) {
  var result;
  if (Callback.roles.length > 5) {
    result =
      Callback.roles
        .map(roles => roles)
        .slice(1, 5)
        .join(", ") + " ...";
  } else {
    result = Callback.roles
      .map(roles => roles)
      .slice(1, 5)
      .join(", ");
  }
  if (!result) result = "Aucun rôle";
  return result;
}
