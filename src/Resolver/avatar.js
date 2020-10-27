"use strict";

module.exports = (ID, avatar) => {
  let format = ".png";
  if (avatar.startsWith("a_")) format = ".gif";
  return `https://cdn.discordapp.com/avatars/${ID}/${avatar}${format}?size=2048`;
};
