const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['bugreport', 'report', 'reportbug'],
            description: `Found a bug? report it immediately!`,
            usage: '<bug>',
            category: 'Support'
        });
    }

    async run(message, args) {

        if (!args.length) return message.channel.send("What's the bug you want to report?");

        const channel = this.client.channels.cache.get("745847381710602241");

        const servers1 = ('727797484264620064');
        const servers2 = ('708567774242537512');
        const servers3 = ('740450115202056192');

        const channel1 = this.client.channels.cache.get('727886171149041696');
        const channel2 = this.client.channels.cache.get('741987747526475796');
        const channel3 = this.client.channels.cache.get('741987535265464400');

        const embed = new MessageEmbed()
            .addField('Submitter', `${message.author.tag}`)
            .addField('Issue',`> ${args.join("  ")}`)
            .setColor(channel.guild.me.displayHexColor || 'RANDOM')
            .setThumbnail(message.author.displayAvatarURL({ size: 512 }))
            .setFooter(`User ID: ${message.author.id} | Server ID: ${message.guild.id}`)
            .setTimestamp();

        await channel1.send(embed);
        await channel2.send(embed);
        await channel3.send(embed);
        return message.reply(`Your bug report has been successfully submitted${message.guild && message.guild.id !== servers1 || servers2 || servers3 ? " to the support server" : ""}.`);
    }

};
