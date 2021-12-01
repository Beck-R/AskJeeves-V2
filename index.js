const fetch = require('node-fetch');
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, myToken } = require('./config.json');


const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

let guilds = []


client.login(myToken);

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Jeeves initialized');
    
    let bot_age = Math.floor((Date.now() - client.user.createdTimestamp));
    bot_age = Math.floor(bot_age / (1000 * 60 * 60 * 24));

    text = `{ 
        "name": "AskJeeves",
        "version": "0.9.6",
        "prefix": "jeeves,",
        "myToken": "TOKEN HERE",
        "admins": [
          "358374257593417752"
        ],
        "bot_age" : {
          "number": ${bot_age}
        }
      }`

    json = JSON.parse(text);

    fs.writeFileSync('./config.json', JSON.stringify(json, null, 2));
    

    console.log(json);

    client.guilds.cache.forEach(guild => {
        guilds.push(guild);
    });

    client.user.setPresence({
            status: 'dnd',
            activity: {
                name: 'with my pet cock',
                type: 'PLAYING'
            }
        }
    );
});

client.on('message', message => {
    time = getDate(message.createdTimestamp);

    text = `\n${time}:\n${message.author.username}: ${message.content}
    `;

    fs.appendFile('./messages.txt', text, function (err) {
        if (err) throw err;
        console.log(message.author.username + ':');
        console.log(message.content + '\n');
    });


    if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) {
        message.channel.send(`Command not found. Use \`${prefix} help\` to see available commands`);
        return;
    }
        
    try{
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
    }

});

// write a a function thats takes seconds and converts that into a date
function getDate(seconds) {
    let date = new Date(seconds);
    return date.toLocaleString();
}
