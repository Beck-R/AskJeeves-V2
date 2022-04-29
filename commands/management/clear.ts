import { Message, Permissions, TextChannel } from "discord.js";
const { admins } = require("../../config.json");


export default {
  name: "clear",
  category: "moderation",
  description: "Deletes specified amount of messages.",
  usage: "clear <# of messages>",
  example: "clear 10",
  callback: async (message: Message, channel: TextChannel, ...args: string[]) => {
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
      try {
        // delete messages
        channel.bulkDelete(count + 1)
      }
      catch (err) {
        console.log(err);
      }
    } else {
      return
    }
  },
}