const Event = require('../Structures/Event');
const { MessageEmbed } = require("discord.js");


module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
        });

    }

    async run(event, err) {
        const mainGuild = this.client.guilds.cache.get("740450115202056192");
        const guildCountChannel3 = mainGuild.channels.cache.get("745867289496256542");
        const channel = mainGuild.cache.get("745871098679394366");
        if (!channel) return;
        const embed = new MessageEmbed()
            .setTitle("Event Error")
            .setDescription(`An Error occured in event: ${event.name}\n\`\`\`js\n${err.stack || err}\`\`\``)
            .setAuthor(`${this.client.user.username}`, this.client.user.displayAvatarURL(), 'https://discord.gg/a2UdmhH')
            .setColor(guildCountChannel3.guild.me.displayHexColor || 'RANDOM')
            .setThumbnail(this.client.user.displayAvatarURL())
            .setTimestamp();
        return channel.send({ embed }).catch(() => null);

    }

}