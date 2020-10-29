'use strict';
const event = require('./../plugin/Event');

/**
   * Event ShardDisconnect
   */
module.exports = class ShardDisconnect extends event {
  /**
     * @param {Client} client - Client
     */
  constructor(client) {
    super(client, {
      name: 'shardError',
      enable: true,
      filename: __filename,
    });
    this.client = client;
  };
  /**
      * Launch script
      * @param {CloseEvent} event
      * @param {number} id
      */
  async launch(event, id) {
    if (process.env.NODE_ENV === 'production') {
      this.client.statusHook.send({
        embeds: [{
          description:
              // eslint-disable-next-line max-len
              `Shard ${id+1}/${this.client.shard.count} is disconnected`,
          color: '#450000',
        }],
      });
    };
    this.client.logger.warn(event);
  };
};
