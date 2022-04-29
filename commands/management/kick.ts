const { admins } = require("../../config.json");
import { Message, TextChannel } from "discord.js";

export default {
  name: "kick",
  category: "moderation",
  description: "Kicks a user from the server.",
  usage: "kick <@user> <reason>",
  example: "kick @John Doe Being a jerk",
  callback: async (message: Message, channel: TextChannel,...args: string[]) => {
    if (!message.member) return;
    if (
      admins.includes(message.author.id) ||
      message.member.permissions.has("KICK_MEMBERS") ||
      message.member.permissions.has("ADMINISTRATOR")
    ) {
      try {
        const targetUser = message.mentions.users.first()

        if (!targetUser) return
        args.shift();

        const reason = args.join(" ");
        const { guild } = message;
        if (!guild) return;
        const member = guild.members.cache.get(targetUser.id);

        if (!member) return;

        member.kick(reason);
      } catch (err) {
        console.log(err);
      }
    }
  },
};
