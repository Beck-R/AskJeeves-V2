import { Message, Permissions, TextChannel } from "discord.js";
const { admins } = require("../config.json");


export default {
  name: "test-perms",
  category: "hidden",
  description: "Test the permissions of a user",
  usage: "test-perms <user>",
  example: "test-perms @John_Doe Admin",
  callback: async (message: Message, channel: TextChannel, ...args: string[]) => {
    if (!admins.includes(message.author.id)) return;
    if (!message.guild) return;
    if (!message.guild.me) return;
    
    channel.bulkDelete(1);
    message.author.send("I can :");
    message.author.send(message.guild.me.permissions.toString());
    message.author.send(`On ${message.guild.name}`);
  },
};
