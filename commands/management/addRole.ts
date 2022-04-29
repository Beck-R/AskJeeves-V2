import { Message, Permissions, TextChannel } from "discord.js";
const { admins } = require("../../config.json");


export default {
  name: "add-role",
  category: "moderation",
  description: "Adds specified role to chosen user",
  usage: "add-role <@user> <role>",
  example: "add-role john_doe Admin",
  callback: async (message: Message, channel: TextChannel, ...args: string[]) => {
    if (!message.member) return;
    if (!message.guild) return;
    
    if (
      admins.includes(message.author.id) ||
      message.member.permissions.has("MANAGE_ROLES")
    ) {
      try {
        const targetUser = message.mentions.users.first();
        if (!targetUser) return;
        args.shift();

        const roleName = args.join(" ");
        const { guild } = message;
        const role = guild.roles.cache.find((role) => role.name === roleName);
        const member = guild.members.cache.get(targetUser.id);

        if (!member) return;
        if (!role) return;

        member.roles.add(role);
      } catch (err) {
        console.log(err);
      }
    } else {
      return;
    }
  },
};
