const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const math = require('mathjs');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['calculate'],
            description: 'Get the answer to a math problem.',
            usage: '<question>',
            category: 'Utilities'
        });
    }

    async run(message, args) {

        if (!args[0]) return message.reply('Please provide a question!');

        let resp;

        try {
            resp = math.evaluate(args.join(" "))
        } catch (e) {
            return message.reply('Please provide a **valid** question!');
        }

        const embed = new MessageEmbed()
            .setColor(message.guild.me.displayHexColor || 'RANDOM')
            .setTitle('Calculator')
            .addField('> Question', `\`\`\`\n${args.join(' ')}\`\`\``)
            .addField('> Answer', `\`\`\`\n${resp}\`\`\``)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

        message.channel.send(embed);

    }

};
