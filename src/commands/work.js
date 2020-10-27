"use strict";

module.exports = {
  name: "work",
  aliases: [],
  description: "Travailler pour obtenir de l'argent",
  guildOnly: true,
  cooldown: 300,
  category: "economie",
  async execute(client, { message, user, S_User }) {
    var display = S_User.money;
    var addAmount = Math.floor(Math.random() * 500) + 1;

    display = S_User.money + addAmount || addAmount + S_User.money;

    client.updateUser(user, { money: display });
    message.reply(
      `Vous venez de travailler et de gagner ${addAmount} <:axemoney:680848279482925058> !`
    );
  }
};
