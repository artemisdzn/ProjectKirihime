const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      aliases: ["wiki"],
      description: "Finds a Wikipedia Article by title.",
      usage: "<query>",
      category: 'Utilities'
    });
  }

  async run(message, args) {
    const article = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(args.join(" "))}`)
      .then((res) => res.json())
      .catch(e => {
        return message.channel.send("I couldn't find a wikipedia article with that title!");
      });

    if (!args[0]) return message.channel.send(`\`${this.client.prefix}wikipedia <query>\``);

    if (!article.content_urls) return message.channel.send("I couldn't find a wikipedia article with that title!");
    const embed = new MessageEmbed()
      .setColor(message.guild.me.displayHexColor || 'RANDOM')
      .setThumbnail("https://i.imgur.com/fnhlGh5.png")
      .setTitle(`Wikipedia | ${article.title}`)
      .setDescription([
        `[Invite Me](https://discord.com/oauth2/authorize?client_id=727057927596277821&scope=bot&permissions=2146958847) | [Community Server](https://discord.gg/fY3tnh7) | [Support Server](https://discord.gg/a2UdmhH) | [Hangout Server](https://discord.gg/ygxFdJP)`,
        `\u200b`,
        `> ${article.extract}`,
        `\u200b`,
        article.content_urls.desktop.page
      ])
      .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp();
    return message.channel.send(embed);
  }

};
