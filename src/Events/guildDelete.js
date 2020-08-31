const Event = require('../Structures/Event');
const { MessageEmbed } = require("discord.js");


module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
        });

    }

    async run(guild) {
        if (!guild.available) return;

        const channel = this.client.channels.cache.get("745847476891942963");

        const embed = new MessageEmbed()
            .setTitle(`${this.client.user.username} left a server.`)
            .setDescription(guild.name)
            .setColor(channel.guild.me.displayHexColor || 'RANDOM')
            .setThumbnail(guild.iconURL())
            .addField("Owner", guild.owner ? guild.owner.user.tag : "Failed to fetch owner information.")
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
            .setTitle(`List of Guilds Handled`)
            .setDescription(`${guildArray}`)
            .setColor(guildCountChannel3.guild.me.displayHexColor || 'RANDOM')
            .setThumbnail(this.client.user.displayAvatarURL())
            .setTimestamp();

        guildCountChannel3.send(list)

        guild.owner.send([
            `Oh, you removed me from your guild. If you want to tell me the reason, please join the following servers:`,
            `https://discord.gg/fY3tnh7`,
            `https://discord.gg/a2UdmhH`,
            `https://discord.gg/ygxFdJP`,]).then(msg => msg.delete({ timeout: 30000 }));

        return channel.send({ embed });

    }

}