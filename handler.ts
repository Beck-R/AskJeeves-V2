import { Client, MessageFlags } from 'discord.js'
import { Configuration, OpenAIApi } from "openai";
import fs from 'fs'
import getFiles from './get'
import dotenv from  'dotenv'

const { blacklist } = require("./config.json");
dotenv.config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

const openai = new OpenAIApi(configuration);

export default (client: Client) => {
    const commands = {} as {
        [key: string]: any
    }

    const suffix = '.ts'
    if (!process.env.PREFIX) return
    const prefix = process.env.PREFIX

    const files = getFiles('./commands', suffix)

    for (const command of files) {
        let commandFile = require(command)
        if (commandFile.default) commandFile = commandFile.default
        const split = command.replace(/\\/g, '/').split('/')
        const commandName = commandFile.name

        commands[commandName.toLowerCase()] = commandFile
    }
    console.log(commands)

    client.on('messageCreate', (message) => {
        if (message.author.bot) return
        
        let time = getDate(message.createdTimestamp);

        // log messages
        let text = `\n${time}:\n${message.author.username}: ${message.content}
          `;
      
        fs.appendFile("./logs/messages.txt", text, function (err) {
          if (err) throw err;
          console.log(`${message.author.username} : ${message.content}\n`);
        }); 

        if (blacklist.includes(message.author.id)) {
            correctGrammar(message.content)
            .then(response => {
                if (!response) {
                    message.reply("Your so dumb I don't even know how to correct you")
                    return;
                }
                message.reply(response)
            });
            return;
        }

        if (!message.content.startsWith(prefix)) return

        const args = message.content.slice(prefix.length).trim().split(/ +/)
        const commandName = args.shift()!.toLowerCase()

        if (!commands[commandName]) return

        try {
            commands[commandName].callback(message, ...args)
        } catch (e) {
            console.error(e)
        }
    });
};

function getDate(seconds: number) {
    let date = new Date(seconds);
    return date.toLocaleString();
}

async function correctGrammar(message: string) {
    let prompt = `Correct this to standard English:\n\n${message}`

    const response = await openai.createCompletion("text-davinci-002", {
        prompt: prompt,
        temperature: 0,
        max_tokens: 60,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    if (!response.data.choices) return;
    let cleaned = (`${response.data.choices[0].text}`).slice(2);
    let corrected = (`*${cleaned}`)
    return (corrected);
}
