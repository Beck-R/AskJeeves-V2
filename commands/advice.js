const fetch = require('node-fetch');

module.exports = {
    name: 'advice',
    category: 'fun',
    description: 'Gives you some advice',
    usage: 'advice',
    example: 'advice',
    execute(message) {
        fetch('https://api.adviceslip.com/advice')
        .then(res => res.json())
        .then(json => {
            const advice = json.slip.advice;
            message.channel.send(`${message.author}, ${advice}`);
        })
    }
}