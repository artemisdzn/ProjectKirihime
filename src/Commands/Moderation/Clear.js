const Command = require('../../Structures/Command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['purge'],
            description: "Clears messages that aren't 14 days old. The user must have manage messages permission to use this command.",
            usage: '<number of messages>',
            category: 'Moderation'
        });
    }

    async run(message, args) {

        if (!message.guild.member(message.author).hasPermission('MANAGE_MESSAGES')) return message.channel.send('You do not have permission to do this!');

        const amount = args.join(" ");

        if (!amount) return message.channel.send('please provide an amount of messages for me to delete')

        if (amount > 100) return message.channel.send(`you cannot clear more than 99 messages at once`)

        if (amount < 1) return message.channel.send(`you need to delete at least one message`)

        if (message.guild.member(message.author).hasPermission('MANAGE_MESSAGES')) {
            await message.channel.messages.fetch({ limit: amount }).then(messages => {
                message.channel.bulkDelete(parseInt(args)
                ).catch(error => {
                    console.error(error);
                    message.channel.send('I cannot delete messages that are 14 days old!');
                });
                return message.channel.send(`Cleared ${args} messages!`).then(msg => msg.delete({ timeout: 1500 }))
            });
        }

    }

};
