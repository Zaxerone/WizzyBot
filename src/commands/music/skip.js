'use strict';
const corePlayer = require('./../../plugin/Music');
const Command = require('../../plugin/Command');
const Discord = require('discord.js');

/**
 * Command class
 */
module.exports = class Skip extends Command {
  /**
     * @param {Discord.Client} client - Client
     */
  constructor(client) {
    super(client, {
      name: 'skip',
      category: 'music',
      description: 'command_skip_description',
      usage: 'skip',
      nsfw: false,
      enable: true,
      guildOnly: true,
      aliases: [],
      mePerm: [],
      userPerm: [],
    });
    this.client = client;
  };
  /**
     * @param {Discord.Message} message - message
     * @return {Promise<Discord.Message>}
     */
  async launch(message) {
    if (!message.member.voice.channel) return message.reply('💢');
    const player = corePlayer.initPlayer(this.client, message.guild.id);
    if (!player.dispatcher) return message.channel.send(`I don't play a music`);
    if (!corePlayer.hasPermission(this.client, message)) {
      const call = await corePlayer.callRequest(message,
          new Discord.MessageEmbed(), {
            required: `Require {{mustVote}} votes for skip this music`,
            complete: `Vote completed, you skip this music`,
            content: `Vote {{haveVoted}}/{{mustVote}}`,
          });
      if (call) {
        if (!player.dispatcher) {
          return message.channel.send(`I don't play a music`);
        };
        switch (player.loop) {
          case 'off':
            player.queue.shift();
            corePlayer.play(this.client, message);
            break;
          default:
            await player.dispatcher.destroy();
            if (player.index === player.queue.length - 1) {
              player.index = 0;
            } else {
              player.index++;
            };
            player.play(message, guildPlayer, guild);
            break;
        }
      } else {
        return message.channel.send(`You don't skip music`);
      };
    } else {
      switch (player.loop) {
        case 'off':
          player.queue.shift();
          corePlayer.play(this.client, message);
          break;
        default:
          await player.dispatcher.destroy();
          if (player.index === player.queue.length - 1) {
            player.index = 0;
          } else {
            player.index++;
          };
          player.play(message, guildPlayer, guild);
          break;
      }
    };
  };
};
