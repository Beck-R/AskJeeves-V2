const { admins } = require("../../config.json");

module.exports = {
  name: "remove-role",
  category: "moderation",
  description: "Removes specified role from chosen user",
  usage: "remove-role <@user> <role>",
  example: "remove-role john_doe Admin",
  execute(message, args) {
    if (
      admins.includes(message.author.id) ||
      message.member.hasPermission("ADMINISTRATOR")
    ) {
      const targetUser = message.mentions.users.first();
      args.shift();

      const roleName = args.join(" ");
      const { guild } = message;
      const role = guild.roles.cache.find((role) => role.name === roleName);
      const member = guild.members.cache.get(targetUser.id);

      member.roles.remove(role);
    } else {
      return;
    }
  },
};
