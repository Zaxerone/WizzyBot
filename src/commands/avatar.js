"use strict";

const avatar = require("./../Resolver/avatar");

module.exports = {
  name: "avatar",
  aliases: ["pp", "pdp"],
  description: "affiche l'avatar d'une personne",
  category: "fun",
  cooldown: 3,
  async execute(client, { args, channel, user, message }) {
    var messageLoading = await channel.send("Chargement en cours...");
    var userSearch = args.shift();
    if (!userSearch) userSearch = user;
    else
      userSearch =
        client.users.find(user => user.username === userSearch) ||
        client.users.get(userSearch) ||
        message.mentions.users.first() ||
        user;
    if (!userSearch) {
      messageLoading.delete({ timeout: 0 });
      throw TypeError(
        `L'utilisateur n'à pas pu être selectionné ! -args > ${userSearch} userSearch`
      );
    }
    let URL = avatar(userSearch.id, userSearch.avatar);
    channel
      .send({
        embed: {
          title: `**Photo de profil de ${userSearch.tag}**`,
          image: {
            url: URL
          }
        }
      })
      .then(() => {
        messageLoading.delete({ timeout: 0 });
      })
      .catch(console.error);
  }
};
