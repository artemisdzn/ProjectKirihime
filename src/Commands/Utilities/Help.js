const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: [],
            description: 'Displays all the command of the bot.',
            category: 'Utilities',
            usage: '[command]'
        });
    }



    async run(message, [command]) {

        const embed = new MessageEmbed()
            .setThumbnail(this.client.user.displayAvatarURL())
            .setColor(message.guild.me.displayHexColor || 'RANDOM')
            .setTitle(`${message.guild.name} Help Menu`)
            .setFooter(`Bot developed by アルテミス#2780`, this.client.guilds.resolve('740450115202056192').members.resolve('278136676574953472').user.displayAvatarURL({ dynamic: true }));

        if (command) {
            const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));

            if (!cmd) if (!command) await message.delete().catch(() => null)

            const embed = new MessageEmbed()
                .setColor(message.guild.me.displayHexColor || 'RANDOM')
                .setTitle(`The Command Does Not Exist!`)
                .setFooter(`Bot developed by アルテミス#2780`, this.client.guilds.resolve('740450115202056192').members.resolve('278136676574953472').user.displayAvatarURL({ dynamic: true }))
                .setDescription([
                    `[Invite Me](https://discord.com/oauth2/authorize?client_id=727057927596277821&scope=bot&permissions=2146958847) | [Community Server](https://discord.gg/fY3tnh7) | [Support Server](https://discord.gg/a2UdmhH) | [Hangout Server](https://discord.gg/ygxFdJP)`,
                    `The following command named \`${command}\` does not exist, please do \`${this.client.prefix}help\` to view the command list!`
                ])
                .setTimestamp();

            if (!cmd) return message.channel.send(embed);

            embed.setTitle(`${this.client.utils.capitalise(cmd.name)} Command Help`)
            embed.setThumbnail(this.client.user.displayAvatarURL()),
                embed.setDescription([
                    `> Aliases: ${cmd.aliases.length ? cmd.aliases.map(alias => `\`${alias}\``).join(' ') : 'No Aliases'}`,
                    `> Description: ${cmd.description}`,
                    `> Category: ${cmd.category}`,
                    `> Usage: ${cmd.usage}`,
                    `> Extras ${cmd.extras}`
                ]);

            return message.channel.send(embed);

        } else {

            embed.setDescription([
                `[Invite Me](https://discord.com/oauth2/authorize?client_id=727057927596277821&scope=bot&permissions=2146958847) | [Community Server](https://discord.gg/fY3tnh7) | [Support Server](https://discord.gg/a2UdmhH) | [Hangout Server](https://discord.gg/ygxFdJP)`,
                `These are the available commands for ${message.guild.name}`,
                `The bot's prefix is: \`${this.client.prefix}\``,
                `Command Parameters: \`<>\` is strict & \`[]\` is optional`,
                `To view the command description please do \`${this.client.prefix}help <command>\``,
                `[Vote Me!](https://top.gg/bot/727057927596277821/vote)`
            ]);
            let categories;
            if (!this.client.owners.includes(message.author.id)) {
                categories = this.client.utils.removeDuplicates(this.client.commands.filter(cmd => cmd.category !== 'Owner').map(cmd => cmd.category));
            } else {
                categories = this.client.utils.removeDuplicates(this.client.commands.map(cmd => cmd.category));
            }

            for (const category of categories) {
                embed.addField(`${this.client.utils.capitalise(category)}`, `> ${this.client.commands.filter(cmd =>
                    cmd.category === category).map(cmd => `\`${cmd.name}\``).join(' ')}`);
            }

            return message.channel.send(embed);
        }
    }

};
