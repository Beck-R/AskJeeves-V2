import DiscordJS, { Intents } from 'discord.js'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()


const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    ],
})

client.on('ready', () => {
    if (!client.user) return;
    console.log(`Initialized ${client.user.username}`);

    client.user.setActivity('with my pet cock', { type: 'PLAYING' })
    client.user.setStatus('dnd')

    let handler = require('./handler');
    if (handler.default) handler = handler.default
    handler(client);

    
    // update info in config.json
    let bot_age = Math.floor((Date.now() - client.user.createdTimestamp));
    bot_age = Math.floor(bot_age / (1000 * 60 * 60 * 24));

    const guilds = client.guilds.cache.map(guild => guild.name);

    fs.readFile("./config.json", "utf8", (err, data) => {
        if (err) throw err;
        let config = JSON.parse(data);
        config.bot_age.number = bot_age;
        config.guilds = guilds;
        fs.writeFile("./config.json", JSON.stringify(config, null, 2), (err) => {
          if (err) throw err;
        });
        console.log(config);
    });
});

client.login(process.env.TOKEN)