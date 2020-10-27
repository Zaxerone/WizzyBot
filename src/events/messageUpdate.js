"use strict";

module.exports = async (client, oldMessage, newMessage) => {
  if (oldMessage.content == newMessage.content) return false;
  const settings = await client.getGuild(oldMessage.guild || newMessage.guild);
  if (settings.welcomeChannel === null) return false;
  const channel = await newMessage.guild.channels.find(
    channel =>
      channel.name == settings.logsChannel || channel.id == settings.logsChannel
  );
  if (!channel) return false;
  if (newMessage.author.id === client.user.id) return false;
  if (newMessage.attachment) return false;

  await channel.send({
    embed: {
      title: "Message Edité",
      color: 0x1f8b4c,
      description: `${
        newMessage.author.tag
      } a édité son message dans le salon ${newMessage.channel}\n**Avant:** ${
        oldMessage.content
      }\n**Après:** ${
        newMessage.content
      }\n*[Voir le message](${await newMessage.url})*`,
      timestamp: new Date(),
      footer: {
        text: client.user.tag,
        icon_url: client.botAvatar
      }
    }
  });
  return;
};
