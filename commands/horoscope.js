const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name: 'horoscope',
    category: 'fun',
    description: 'Finds daily info about your horoscope',
    usage: 'horoscope <sign> <yesterday/today/tomorrow>',
    example: 'horoscope aries today',
    async execute(message, args) {
        if (!args[0].length) {
            message.channel.send('Missing arguments');
            return;
        }

        const sign = args[0].toLowerCase();
        const date = args[1].toLowerCase();

        const response = await fetch(`https://aztro.sameerkumar.website/?sign=${sign}&day=${date}`, { method: 'POST'} );
        const json = await response.json();
        
        const embed = new Discord.MessageEmbed()
            .setColor('#161616')
            .setTitle(`${json.current_date}, ${sign}`)
            .setDescription(json.description)
            .addFields( {name: 'Additional info:', 
            value: `Compatibility: ${json.compatibility}\nMood: ${json.mood}\nLucky Number: ${json.lucky_number}`} )
        
        message.channel.send(embed);
    }
}