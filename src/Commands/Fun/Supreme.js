const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['supremeify'],
            description: 'Supremeifies your text!',
            category: 'Fun',
            usage: '<text>'
        });
    }

    async run(message, args) {

        if (!args[0]) return message.channel.send(`\`${this.client.commands.get(this.name).usage}\``);

        const supreme = new MessageEmbed()
            .setColor(message.guild.me.displayHexColor || 'RANDOM')
            .setTitle('Here\'s Your Supremeified Text')
            .setImage(`https://api.alexflipnote.dev/supreme?text=${args.join("%20")}`)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()

        message.channel.send(supreme);

    }

};
