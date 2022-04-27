const { admins } = require("../../config.json");
import { Message, Permissions } from "discord.js";

export default {
  name: "clear",
  category: "moderation",
  description: "clears specified amount of messages",
  usage: "clear <# of messages>",
  example: "clear 10",
  permissions : ["MANAGE_MESSAGES"],
  callback: async (message: Message, ...args: string[]) => {
    const count = parseInt(args[0]);
    
    // check if args is integer
    if (!Number.isInteger(count)) return;
    
    // stupid typescript
    if (!message.member) return;
    
    // check if super-admin or server admin
    if (
      admins.includes(message.author.id) ||
      message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)
    ) {
      // fetch messages up to count and delete
      const messages = await message.channel.messages.fetch({ limit: count + 1})
      messages.forEach((message) => message.delete())
    } else {
      return
    }
  },
}