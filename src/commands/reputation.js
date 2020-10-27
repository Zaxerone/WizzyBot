"use strict";

module.exports = {
  name: "reputation",
  aliases: ["rep"],
  description: "Affiche ou ajoute une réputation",
  cooldown: 7,
  category: "compte",
  async execute(client, { S_User, channel, args, guild, message, user }) {
    var userSearch = args.shift();
    if (!userSearch)
      return channel.send(`vous avez ${S_User.rep} point de REP`);
    var UserFound = guild.member(
      message.mentions.users.first() ||
        client.users.find(user => user.username === userSearch) ||
        client.users.get(userSearch)
    );
    if (!UserFound)
      return channel.send("Je ne trouve pas l'utilisateur dans le serveur !");
    if (UserFound.id === user.id)
      return channel.send(`Vous ne pouvez pas vous donnez de la réputation !`);
    var User_Account = await client.getUser(UserFound);
    var repCount = await User_Account.rep;
    await client.updateUser(UserFound, { repCount: repCount + 1 });
    return channel.send(`Vous avez donné une réputation à ${UserFound}`);
  }
};
