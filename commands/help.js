const Discord = require('discord.js');
const { bot_age, prefix, name, version } = require('../config.json');

module.exports = {
    name: "help",
    category: "utility",
    description: "Shows info on Jeeves and commands",
    usage: "help",
    execute(message, args) {
        const embed = new Discord.MessageEmbed()
            .setColor('#161616')
            .setAuthor(`${name}`, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVfHPucqTDHcfg-8H6KK3ErTp5jobfEPyu0C5Fc87hqW1I3WGFO08O1d-cboLHWtPde-Y&usqp=CAU')
            .setTitle('Help Desk:')
            .setDescription(`AskJeeves is meant to serve as your servers personal butler. He has many features ranging from entertainment focused commands to management oriented features`)
            .addFields(
                { name: 'Basic Usage Info:', 
                value: `Prefix: ${prefix}\nVerison: ${version}\nAge: ${bot_age.number} Days`},
                { name: '\u200b', value: '\u200b' },
                
                { name: 'Moderation Commands:', value: '‎' },
                { name: 'Clear Usage:', value: `\`${prefix} clear <# of messages>\``, inline: true},
                { name: 'Add-role Usage:', value: `\`${prefix} add-role <@user> <role>\``, inline: true},
                { name: 'Remove-role Usage:', value: `\`${prefix} remove-role <@user> <role>\``, inline: true},
                { name: '\u200b', value: '\u200b' },
                
                { name: 'Fun Commands:', value: '‎' },
                { name: 'Kayne-quote Usage:', value: `\`${prefix} kanye-quote <sfw/nsfw> <category>\``, inline: true},
                { name: '\u200b', value: '\u200b' },
                
                { name: 'HINT:', value: `For more info on specific commands use:\n\`${prefix} help <command>\`` }
            )

        // this makes my eyes bleed, most def a better way to do this
        var help_embed = new Discord.MessageEmbed()

        if (!args.length) {
            message.channel.send(embed);
        }
        else if (args[0] == 'clear') {
            help_embed.setTitle('Clear Usage:')
            .setDescription(`\`clears specified amount of messages\``)
            .addFields(
                { name: 'Example:', value: `\`${prefix} clear 10\`` }
            )
            message.channel.send(help_embed);
        }
        else if (args[0] == 'add-role') {
            help_embed.setTitle('Add-role Usage:')
            .setDescription(`\`Adds specified role to chosen user\``)
            .addFields(
                { name: 'Example:', value: `\`${prefix} add-role <@user> <role>\`` }
            )
            message.channel.send(help_embed);
        }
        else if (args[0] == 'remove-role') {
            help_embed.setTitle('Remove-role Usage:')
            .setDescription(`\`Removes specified role from chosen user\``)
            .addFields(
                { name: 'Example:', value: `\`${prefix} remove-role <@user> <role>\`` }
            )
            message.channel.send(help_embed);
        }
        else if (args[0] == 'kanye-quote') {
            help_embed.setTitle('Kayne-quote Usage:')
            .setDescription(`\`Overlays a random Ye quote over a random sfw/nsfw anime picture from a specified category. To view the different categories go to https://waifu.pics/docs\``)
            .addFields(
                { name: 'Example:', value: `\`${prefix} kanye-quote sfw neko\`` }
            )
            message.channel.send(help_embed);
        }
        else {
            message.channel.send(`Command not found. Use \`${prefix} help\` to see available commands`);
        }
    }
}