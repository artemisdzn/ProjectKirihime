const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: `Grab the server icon.`,
            category: 'Utilities',
        });
    }

    async run(message) {

        if (!message.guild.iconURL()) return message.reply("There is no server icon in this server.");

        const embed = new MessageEmbed()
            .setTitle(`${message.guild.name}'s icon`)
            .setImage(message.guild.iconURL({ size: 2048, dynamic: true }))
            .setColor(message.guild.me.displayHexColor || 'RANDOM')
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
        return message.channel.send({ embed });
    }
};
