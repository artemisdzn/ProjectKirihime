const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['suggest', 'idea'],
            description: `Suggest new features for the bot.`,
            usage: '<suggestion>',
            category: 'Support'
        });
    }

    async run(message, args) {

        if (!args.length) return message.reply("What's the idea you want suggest?")

        const channel = this.client.channels.cache.get("745847381710602241");

        const servers1 = ('727797484264620064');
        const servers2 = ('708567774242537512');
        const servers3 = ('740450115202056192');

        const channel1 = this.client.channels.cache.get('741985973562245201');
        const channel2 = this.client.channels.cache.get('741987730048811050');
        const channel3 = this.client.channels.cache.get('741987523978330182');

        const embed = new MessageEmbed()
            .addField('Submitter', `${message.author.tag}`)
            .addField('Suggestion', `> ${args.join("  ")}`)
            .setColor(channel.guild.me.displayHexColor || 'RANDOM')
            .setThumbnail(message.author.displayAvatarURL({ size: 512 }))
            .setFooter(`User ID: ${message.author.id} | Server ID: ${message.guild.id}`)
            .setTimestamp();

        const messages1 = await channel1.send(embed);
        await messages1.react("👍");
        await messages1.react("👎");

        const messages2 = await channel2.send(embed);
        await messages2.react("👍");
        await messages2.react("👎");

        const messages3 = await channel3.send(embed);
        await messages3.react("👍");
        await messages3.react("👎");

        return message.reply(`Your suggestion has been successfully submitted${message.guild && message.guild.id !== servers1 || servers2 || servers3 ? " to the support server" : ""}.`);
    }

};
