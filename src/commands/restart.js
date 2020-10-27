"use strict";

module.exports = {
  name: "restart",
  aliases: ["reboot"],
  description: "redémarre le bot",
  cooldown: 10,
  category: "staff",
  async execute(client, { args, user, channel }) {
    if (user.id !== "525729900670222337") return false;
    const m = await channel.send("Redémarrage en cours...");
    await process.exit(1).then(async () => {
      await client.login();
      m.edit(`Bot redémarré`);
      if (args.shift() == "withMaint") client.maintenance == true;
    });
  }
};
