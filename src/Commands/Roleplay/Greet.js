const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['greets'],
            description: 'Roleplaying.',
            category: 'Roleplay'
        });
    }

    async run(message, args) {

        let gifs = [
            `https://cdn.discordapp.com/attachments/741841371954151514/741858397665755176/Greet3.gif`,
            `https://cdn.discordapp.com/attachments/741841371954151514/741858392234000464/Greet2.gif`,
            `https://cdn.discordapp.com/attachments/741841371954151514/741858390329917440/Greet.gif`,
            `https://cdn.discordapp.com/attachments/741841371954151514/741858390078128178/Greet1.gif`,
            `https://cdn.discordapp.com/attachments/741841371954151514/741858379923718164/Greet4.gif`
        ];
        let pick = gifs[Math.floor(Math.random() * gifs.length)];

        const reason = args.join(" ");

        const embed = new MessageEmbed()

        embed.setImage(pick)
        embed.setColor(message.guild.me.displayHexColor || 'RANDOM')
        embed.setDescription(`${message.author} greets ${reason ? ` ${reason}` : ""}`)
        return message.channel.send(embed);
    }

};
