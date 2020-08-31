const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['punches'],
            description: 'Roleplaying.',
            category: 'Roleplay'
        });
    }

    async run(message, args) {

        let gifs = [
            `https://cdn.discordapp.com/attachments/741841619078217830/741862698782031892/4.gif`,
            `https://cdn.discordapp.com/attachments/741841619078217830/741862693539020840/3.gif`,
            `https://cdn.discordapp.com/attachments/741841619078217830/741862680155127909/2.gif`,
            `https://cdn.discordapp.com/attachments/741841619078217830/741862673322606612/1.gif`,
            `https://cdn.discordapp.com/attachments/741841619078217830/741862660919787590/6.gif`,
            `https://cdn.discordapp.com/attachments/741841619078217830/741862652623716362/5.gif`
        ];
        let pick = gifs[Math.floor(Math.random() * gifs.length)];

        const reason = args.join(" ");

        const embed = new MessageEmbed()

        embed.setImage(pick)
        embed.setColor(message.guild.me.displayHexColor || 'RANDOM')
        embed.setDescription(`${message.author} punches ${reason ? ` ${reason}` : ""}`)
        return message.channel.send(embed);
    }

};
