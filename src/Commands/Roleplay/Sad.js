const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['depress'],
            description: 'Roleplaying.',
            category: 'Roleplay'
        });
    }

    async run(message, args) {

        let gifs = [
            `https://cdn.discordapp.com/attachments/741841680269049867/741863307564286032/Cry8.gif`,
            `https://cdn.discordapp.com/attachments/741841680269049867/741863300777902182/Cry6.gif`,
            `https://cdn.discordapp.com/attachments/741841680269049867/741863299645440020/Cry7.gif`,
            `https://cdn.discordapp.com/attachments/741841680269049867/741863290602520576/Cry5.gif`,
            `https://cdn.discordapp.com/attachments/741841680269049867/741863287096082512/Cry4.gif`,
            `https://cdn.discordapp.com/attachments/741841680269049867/741863280192127046/Cry3.gif`,
            `https://cdn.discordapp.com/attachments/741841680269049867/741863277708967946/Cry2.gif`,
            `https://cdn.discordapp.com/attachments/741841680269049867/741863272478802000/Cry1.gif`,
            `https://cdn.discordapp.com/attachments/741841680269049867/741863270771720313/Cry.gif`
        ];
        let pick = gifs[Math.floor(Math.random() * gifs.length)];

        const reason = args.join(" ");

        const embed = new MessageEmbed()

        embed.setImage(pick)
        embed.setColor(message.guild.me.displayHexColor || 'RANDOM')
        embed.setDescription(`${message.author} is sad ${reason ? ` ${reason}` : ""}`)
        return message.channel.send(embed);
    }

};
