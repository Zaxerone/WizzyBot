"use strict";

const Constants = require("./Constants");

module.exports = color => {
  if (typeof color === "string") {
    if (color === "RANDOM") return Math.floor(Math.random() * (0xffffff + 1));
    if (color === "DEFAULT") return 0;
    color = Constants.Colors[color] || parseInt(color.replace("#", ""), 16);
  } else if (color instanceof Array) {
    color = (color[0] << 16) + (color[1] << 8) + color[2];
  }

  if (color < 0 || color > 0xffffff) {
    throw new RangeError(
      "Color must be within the range 0 - 16777215 (0xFFFFFF)."
    );
  } else if (color && isNaN(color)) {
    throw new TypeError("Unable to convert color to a number.");
  }
  return color;
};
