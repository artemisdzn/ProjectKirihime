const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['upvote'],
            description: `Upvote for me!`,
            category: 'Support'
        });

    }

    async run(message) {

        const embed = new MessageEmbed()
            .setThumbnail(this.client.user.displayAvatarURL())
            .setColor(message.guild.me.displayHexColor || 'RANDOM')
            .setTitle(`Vote for ${this.client.user.username}!`)
            .setFooter(`Bot developed by アルテミス#2780`, this.client.guilds.resolve('740450115202056192').members.resolve('278136676574953472').user.displayAvatarURL({ dynamic: true }))
            .setDescription([
                `You can vote me using the following link:`,
                `\u200b`,
                `[Vote me at top.gg](https://top.gg/bot/727057927596277821/vote)`,
                `\u200b`
            ])
            .setTimestamp();

        message.reply(`Please check your DM!`);

        message.author.send(embed);

    }

};
