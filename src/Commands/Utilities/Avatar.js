const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['pfp'],
            description: `Grab someone's avatar.`,
            category: 'Utilities',
            usage: 'avatar [@user]'
        });
    }

    async run(message, [userArg]) {

        const user = await this.verifyUser(message, userArg, true);

        return message.channel.send(new MessageEmbed()
            .setTitle(`${user.username}'s avatar`)
            .setColor(message.guild.me.displayHexColor || 'RANDOM')
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setImage(user.displayAvatarURL({ size: 2048, dynamic: true })));

    }
};
