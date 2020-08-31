const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: [],
            description: `Invite the bot to your discord server.`,
            category: 'Support'
        });
    }

    async run(message) {

        const embed = new MessageEmbed()
            .setThumbnail(this.client.user.displayAvatarURL())
            .setColor(message.guild.me.displayHexColor || 'RANDOM')
            .setTitle(`Invite ${this.client.user.username} To Your Server!`)
            .setFooter(`Bot developed by アルテミス#2780`, this.client.guilds.resolve('740450115202056192').members.resolve('278136676574953472').user.displayAvatarURL({ dynamic: true }))
            .addField(
                `You can invite me to your server using the following links:`, [
                `> [Invite Me](https://discord.com/oauth2/authorize?client_id=727057927596277821&scope=bot&permissions=2146958847)`,
                `> [Community Server](https://discord.gg/fY3tnh7)`,
                `> [Support Server](https://discord.gg/a2UdmhH)`,
                `> [Hangout Server](https://discord.gg/ygxFdJP)`,
                `> [Vote me at top.gg](https://top.gg/bot/727057927596277821/vote)`,
                `\u200b`
            ])
            .setTimestamp();

        message.channel.send(`Please check your DM!`);

        message.author.send(embed);

    }

};
