import { Message, TextChannel, MessageEmbed } from "discord.js";
import getFiles from "../get";
import dotenv from  'dotenv'

const { bot_age, prefix, version, blacklist } = require("../config.json");
dotenv.config()

export default {
  name: "help",
  category: "info",
  description: "Shows info on Jeeves and/or commands.",
  usage: "help or help <command>",
  example: "help or help clear",
  callback: async (message: Message, channel: TextChannel, ...args: string[]) => {
    // check if the user is blacklisted
    if (blacklist.includes(message.author.id)) return;

    const commands = {} as {
      [key: string]: any
    };

    const suffix = '.ts';

    const files = getFiles('./commands', suffix);

    for (const command of files) {    
        let commandFile = require(command.replace('./commands', '.'));
        if (commandFile.default) commandFile = commandFile.default;
        const commandName = commandFile.name;

        commands[commandName.toLowerCase()] = commandFile;
    }

    // assemble general info embed
    const general_embed = new MessageEmbed()
      .setColor("#161616")
      .setTitle("Help Desk:")
      .setDescription(
        `AskJeeves is meant to serve as your servers personal butler. He has many features ranging from entertainment focused commands to management oriented features`
      )
      .addFields(
        {
          name: "Basic Usage Info:",
          value: `Prefix: ${process.env.PREFIX}\nAge: ${bot_age.number} Days`,
        },
        { 
          name: "\u200b", 
          value: "\u200b"
         },
      );
  

    for (const command in commands) {
      let name = command.charAt(0).toUpperCase() + command.slice(1);

      if (commands[command].category === "hidden") break;

      let usage = commands[command].usage;
      
      general_embed.addFields(
        { name: `${name} Usage:`,
          value: `\`${process.env.PREFIX} ${usage}\``,
          inline: true,
        },
        { name: "\u200b", value: "\u200b" },
      );
    }

    general_embed.addFields(
      {
        name: "HINT:",
        value: `For more info on specific commands use:\n\`${process.env.PREFIX} help <command>\``,
      }
    )

    
    // either send general info embed or specific command embed
    if (!args.length) {
      message.channel.send({ embeds: [general_embed] });
    } else if (args[0] in commands) {
      let specific_embed = new MessageEmbed();
      const commandName = args.shift()!.toLowerCase()

      if (commands[commandName].category === "hidden") return;
      
      // people ask If Im autistic... Im autistic as shit (capitilzes first letter)
      let name = commandName.charAt(0).toUpperCase() + commandName.slice(1);
      
      // assemble specific command embed
      specific_embed
      .setTitle(`${name} Usage: ${commands[commandName].usage}`)
      .setDescription(
        `\`${commands[commandName].description}\``
      )
      .addFields({
        name: "Example:",
        value: `\`${process.env.PREFIX} ${commands[commandName].example}\``,
      });
      
      message.channel.send({ embeds: [specific_embed]});
    } else {
      message.channel.send(
        `Command not found. Use \`${process.env.PREFIX} help\` to see available commands`
      );
    }
  },
};
