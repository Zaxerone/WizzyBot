"use strict";

module.exports = async (content, data) => {
  if (typeof data !== "object") throw Error("Data is not an Object");
  var ResolvedMsg = content;
  for (const key in data) {
    if (Array.isArray(data[key])) {
      let i = 0;
      let lastReplace = `{{${key}}}`;
      while (ResolvedMsg.includes(lastReplace)) {
        ResolvedMsg = ResolvedMsg.replace(lastReplace, data[key][i]);
        i++;
      }
    } else {
      let lastReplace = `{{${key}}}`;
      while (ResolvedMsg.includes(lastReplace)) {
        ResolvedMsg = ResolvedMsg.replace(lastReplace, data[key]);
      }
    }
  }
  return await ResolvedMsg;
};
