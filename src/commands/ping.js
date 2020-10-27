"use strict";

module.exports = {
  name: "ping",
  aliases: [],
  description: "Affiche la latence du bot",
  cooldown: 5,
  category: "utile",
  async execute(client, { message, channel }) {
    var m = await channel.send("Pong!");
    var compared =
      (m.createdAt || m.editedAt) - (message.createdAt || message.editedAt);
    m.edit(
      `Pong!\nLatence: ${Math.round(compared)} ms\nLatence API: ${Math.round(
        client.ws.ping
      )} ms`
    );
  }
};
