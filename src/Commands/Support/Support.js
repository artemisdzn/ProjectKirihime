const Command = require('../../Structures/Command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: [],
            description: `Returns an invite link to the support server.`,
            category: 'Support'
        });
    }

    async run(message) {

        message.channel.send(`Click here to join my support server: https://discord.gg/a2UdmhH`);

    }

};
