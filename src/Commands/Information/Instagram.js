const axios = require('axios')
const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['inst', 'insta'],
            description: 'Check someone\'s instagram!',
            usage: '<Channel Name>',
            category: `Information`
        });
    }

    async run(message, args) {
        if (!args[0]) {
            return message.channel.send(`Please Enter a Channel Name`)
        }
        let url, response, account, details;
        try {
            url = `https://instagram.com/${args[0]}/?__a=1`;
            response = await axios.get(url)
            account = response.data
            details = account.graphql.user
        } catch (error) {
            return message.channel.send(`Not A Account`)
        }

        const embed = new MessageEmbed()
            .setTitle(`Instagram |${details.is_verified ? `${details.username} :verified:` : ` ${details.username}`} ${details.is_private ? '🔒' : ''} `)
            .setColor(message.guild.me.displayHexColor || 'RANDOM')
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setDescription(details.biography)
            .setThumbnail(details.profile_pic_url)
            .addFields(
                {
                    name: "Total Posts:",
                    value: details.edge_owner_to_timeline_media.count.toLocaleString(),
                    inline: true
                },
                {
                    name: "Followers:",
                    value: details.edge_followed_by.count.toLocaleString(),
                    inline: true
                },
                {
                    name: "Following:",
                    value: details.edge_follow.count.toLocaleString(),
                    inline: true
                }
            )
        await message.channel.send(embed)

    }
}
