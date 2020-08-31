const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['shrugs'],
            description: 'Roleplaying.',
            category: 'Roleplay'
        });
    }

    async run(message, args) {

        let gifs = [
            `https://cdn.discordapp.com/attachments/741841700254777395/741863895190470706/2.gif`,
            `https://cdn.discordapp.com/attachments/741841700254777395/741863909807489074/4.gif`,
            `https://cdn.discordapp.com/attachments/741841700254777395/741863916694405300/5.gif`,
            `https://cdn.discordapp.com/attachments/741841700254777395/741863929642221618/6.gif`
        ];
        let pick = gifs[Math.floor(Math.random() * gifs.length)];

        const reason = args.join(" ");

        const embed = new MessageEmbed()

        embed.setImage(pick)
        embed.setColor(message.guild.me.displayHexColor || 'RANDOM')
        embed.setDescription(`${message.author} shrugs ${reason ? ` ${reason}` : ""}`)
        return message.channel.send(embed);
    }

};
