"use strict";

module.exports = {
  name: "maint",
  aliases: ["maintenence", "maintenance"],
  description: "execute un code",
  cooldown: 24,
  category: "staff",
  execute(client, { args, channel, user }) {
    if (user.id !== "525729900670222337") return false;
    const option = args.shift();
    if (!option) return false;
    switch (option) {
      case "on":
        client.maintenance = true;
        channel.send("Maintenance activé");
        break;
      case "off":
        client.maintenance = false;
        channel.send("Maintenance désactivé");
        break;

      default:
        channel.send("Veuillez mettre une option entre on et off");
    }
  }
};
