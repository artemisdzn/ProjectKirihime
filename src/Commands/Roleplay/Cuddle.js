const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['cuddles'],
            description: 'Roleplaying.',
            category: 'Roleplay'
        });
    }

    async run(message, args) {

        let gifs = [
            `https://cdn.discordapp.com/attachments/741841136934453340/741856513806696468/Cuddle8.gif`,
            `https://cdn.discordapp.com/attachments/741841136934453340/741856513244528711/Cuddle9.gif`,
            `https://cdn.discordapp.com/attachments/741841136934453340/741856513009909760/Cuddle6.gif`,
            `https://cdn.discordapp.com/attachments/741841136934453340/741856510975541329/Cuddle5.gif`,
            `https://cdn.discordapp.com/attachments/741841136934453340/741856509008412802/Cuddle3.gif`,
            `https://cdn.discordapp.com/attachments/741841136934453340/741856505258835998/Cuddle2.gif`,
            `https://cdn.discordapp.com/attachments/741841136934453340/741856503732109352/Cuddle.gif`,
            `https://cdn.discordapp.com/attachments/741841136934453340/741856502893117470/Cuddle1.gif`
        ];
        let pick = gifs[Math.floor(Math.random() * gifs.length)];

        const reason = args.join(" ");

        const embed = new MessageEmbed()

        embed.setImage(pick)
        embed.setColor(message.guild.me.displayHexColor || 'RANDOM')
        embed.setDescription(`${message.author} cuddles ${reason ? ` ${reason}` : ""}`)
        return message.channel.send(embed);
    }

};
