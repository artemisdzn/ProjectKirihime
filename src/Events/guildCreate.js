const Event = require('../Structures/Event');
const { MessageEmbed } = require("discord.js");


module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
        });

    }

    async run(guild) {
        if (!guild.available) return;

        const channel = this.client.channels.cache.get("745847381710602241");

        if (!guild.owner && guild.ownerID) await guild.members.fetch(guild.ownerID);

        const embed = new MessageEmbed()
            .setTitle(`${this.client.user.username} joined a new server`)
            .setDescription(guild.name)
            .setAuthor(`${this.client.user.username}`, this.client.user.displayAvatarURL(), 'https://discord.gg/a2UdmhH')
            .setColor(channel.guild.me.displayHexColor || 'RANDOM')
            .setThumbnail(guild.iconURL())
            .addField("Owner", guild.owner.user.tag)
            .addField("Member Count", guild.memberCount)
            .setFooter(`Server ID: ${guild.id}`)
            .setTimestamp();

        /* if (this.client.settings.guildBlacklist.includes(guild.id)) { TODO
          embed.setFooter(guild.id + " | Blacklisted");
          guild.leave();
          this.client.emit("warn", `Blacklisted guild detected: ${guild.name} [${guild.id}]`);
        }*/

        const mainGuild = this.client.guilds.cache.get("740450115202056192");

        const guildCount = this.client.guilds.cache.size.toLocaleString();
        const guildCountChannel = mainGuild.channels.cache.get("745824448862748814");
        const guildCountChannel1 = mainGuild.channels.cache.get("745857089720811540");
        guildCountChannel.setName(`Guilds: ${guildCount}`)
        guildCountChannel1.setName(`Users: ${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`)

        const guildArray = this.client.guilds.cache.array().join('\n');

        const guildCountChannel3 = mainGuild.channels.cache.get("745867289496256542");
        const list = new MessageEmbed()
            .setTitle(`List of Guilds Handled.`)
            .setDescription(`${guildArray}`)
            .setColor(guildCountChannel3.guild.me.displayHexColor || 'RANDOM')
            .setThumbnail(this.client.user.displayAvatarURL())
            .setTimestamp();

        guildCountChannel3.send(list)

        const guilds = this.client.guilds.cache.get('727797484264620064');
        const channels = guilds.channels.cache.get('741883033350832202');
        const messages = await channels.messages.fetch({ limit: 1 });
        const announcement = messages.first();

        const join = new MessageEmbed()
            .setDescription([
                `[Invite Me](https://discord.com/oauth2/authorize?client_id=727057927596277821&scope=bot&permissions=2146958847) | [Community Server](https://discord.gg/fY3tnh7) | [Support Server](https://discord.gg/a2UdmhH) | [Hangout Server](https://discord.gg/ygxFdJP)`,
                `\u200b`,
                `Thanks for using ${this.client.user.username}!`,
                `Here are some details to get started:`,
                `\u200b`,
                `To view the list of command, please do \`${this.client.prefix}help\` in your server.`,
                `To use the music features of the bot, all you need to do is \`${this.client.prefix}play <title|url|playlist>\`.`,
                `If you found any bugs in ${this.client.user.username}, please report them by using \`${this.client.prefix}bug\``,
                `If you have any ideas for ${this.client.username}, feel free to suggest them by using \`${this.client.prefix}suggest\``,
                `\u200b`,
                `We hope you'll enjoy ${this.client.user.username}!`,
                `\u200b`,
                `\u200b`,
                '**Latest Announcements**',
                `\u200b`,
                `${announcement.cleanContent}`,
                `\u200b`,
                `${new Date(announcement.createdTimestamp)}`
            ])
            .setColor(guildCountChannel3.guild.me.displayHexColor || 'RANDOM')
            .setFooter(`Bot developed by アルテミス#2780`, this.client.guilds.resolve('740450115202056192').members.resolve('278136676574953472').user.displayAvatarURL({ dynamic: true }))
            .setThumbnail(this.client.user.displayAvatarURL())
            .setTimestamp();


        //defaultChannel will be the channel object that it first finds the bot has permissions for
        guild.owner.send(join).then(msg => msg.delete({ timeout: 30000 }));

        return channel.send({ embed });

    }

}