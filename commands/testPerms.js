const { admins } = require("../config.json");

module.exports = {
  name: "test-perms",
  category: "hidden",
  description: "Test the permissions of a user",
  usage: "test-perms <user>",
  example: "test-perms @John_Doe Admin",
  execute(message, args) {
    if (!admins.includes(message.author.id)) return;
    message.channel.bulkDelete(1);
    message.author.send("I can :");
    message.author.send(message.guild.me.permissions.toArray());
    message.author.send(`On ${message.guild.name}`);
  },
};
