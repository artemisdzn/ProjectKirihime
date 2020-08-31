const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['ti'],
            description: 'Shows the top invites in a server.',
            category: 'Utilities'
        });
    }

    async run(message) {
        const invites = await message.guild.fetchInvites();
        const topTen = invites.filter((inv) => inv.uses > 0).sort((a, b) => b.uses - a.uses).first(10);

        if (topTen.length === 0) return message.reply("There are no invites, or none of them have been used!");

        return message.channel.send(new MessageEmbed()
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setTitle(`Top Invites in ${message.guild.name}`)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setColor(message.guild.me.displayHexColor || 'RANDOM')
            .setDescription(topTen.map((inv) => `> ${inv.inviter.username}'s invite \`${inv.code}\` has ${inv.uses.toLocaleString()} uses.`).join("\n")));
    }

};
