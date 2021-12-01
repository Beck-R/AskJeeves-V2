module.exports = {
    name: "clear",
    category: "moderation",
    description: "clears specified amount of messages",
    usage: "clear <# of messages>",
    example: "clear 10",
    execute(message, args) {
        const count = parseInt(args[0]);

        if (!Number.isInteger(count)) return;
        
        if (message.member.author == 358374257593417752 || 902236904093806632) {
            message.channel.bulkDelete(count + 1);
        }
        else if (!message.member.hasPermission("MANAGE_MESSAGES")) return;

        message.channel.bulkDelete(count + 1);
    }
};