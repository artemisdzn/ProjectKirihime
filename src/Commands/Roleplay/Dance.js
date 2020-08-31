const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['dances'],
            description: 'Roleplaying.',
            category: 'Roleplay'
        });
    }

    async run(message, args) {

        let gifs = [
            `https://cdn.discordapp.com/attachments/741841163937644544/741856984466194532/Dance10.gif`,
            `https://cdn.discordapp.com/attachments/741841163937644544/741856981345894520/Dance11.gif`,
            `https://cdn.discordapp.com/attachments/741841163937644544/741856975217754163/Dance13.gif`,
            `https://cdn.discordapp.com/attachments/741841163937644544/741856974597259284/Dance12.gif`,
            `https://cdn.discordapp.com/attachments/741841163937644544/741856946767921292/Dance9.gif`,
            `https://cdn.discordapp.com/attachments/741841163937644544/741856945803362354/Dance8.gif`,
            `https://cdn.discordapp.com/attachments/741841163937644544/741856941848133712/Dance6.gif`,
            `https://cdn.discordapp.com/attachments/741841163937644544/741856939276894258/Dance7.gif`,
            `https://cdn.discordapp.com/attachments/741841163937644544/741856935329923123/Dance5.gif`,
            `https://cdn.discordapp.com/attachments/741841163937644544/741856930326380683/Dance4.gif`,
            `https://cdn.discordapp.com/attachments/741841163937644544/741856927255887972/Dance2.gif`,
            `https://cdn.discordapp.com/attachments/741841163937644544/741856927444762725/Dance3.gif`,
            `https://cdn.discordapp.com/attachments/741841163937644544/741856925792075897/Dance.gif`,
            `https://cdn.discordapp.com/attachments/741841163937644544/741856924588441660/Dance1.gif`
        ];
        let pick = gifs[Math.floor(Math.random() * gifs.length)];

        const reason = args.join(" ");

        const embed = new MessageEmbed()

        embed.setImage(pick)
        embed.setColor(message.guild.me.displayHexColor || 'RANDOM')
        embed.setDescription(`${message.author} dances ${reason ? ` ${reason}` : ""}`)
        return message.channel.send(embed);
    }

};
