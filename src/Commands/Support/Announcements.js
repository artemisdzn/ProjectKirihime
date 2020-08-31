const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['announce', 'news'],
            description: `Get bot related announcements.`,
            category: 'Support'
        });
    }

    async run(message) {

        const guild = this.client.guilds.cache.get('727797484264620064');
        const channel = guild.channels.cache.get('741883033350832202');
        const messages = await channel.messages.fetch({ limit: 1 });
        const announcement = messages.first();

        const embed = new MessageEmbed()
            .setTitle("Bot Announcement")
            .setDescription([
                `> ${announcement.cleanContent}`,
                '\u200b',
                `Announced by: ${message.author.tag}`,
                '\u200b',
                `${new Date(announcement.createdTimestamp)}`])
            .setThumbnail(announcement.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .setColor(message.guild.me.displayHexColor || 'RANDOM');

        return message.channel.send({ embed });

    }

};
