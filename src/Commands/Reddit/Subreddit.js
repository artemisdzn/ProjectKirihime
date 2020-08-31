
const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const fetch = require("node-fetch");

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      aliases: ["sub", "reddit"],
      description: "Searches information of a specified subreddit.",
      usage: "<subreddit>",
      category: 'Reddit'
    });

  }

  async run(message, [subredditName]) {

    const errorembed = new MessageEmbed()
      .setColor(message.guild.me.displayHexColor || 'RANDOM')
      .setTitle(`Something Went Wrong`)
      .setFooter(`Bot developed by アルテミス#2780`, this.client.guilds.resolve('740450115202056192').members.resolve('278136676574953472').user.displayAvatarURL({ dynamic: true }))
      .setDescription([
        `[Invite Me](https://discord.com/oauth2/authorize?client_id=727057927596277821&scope=bot&permissions=2146958847) | [Community Server](https://discord.gg/fY3tnh7) | [Support Server](https://discord.gg/a2UdmhH) | [Hangout Server](https://discord.gg/ygxFdJP)`,
        `There was an error. Reddit may be down or the subreddit doesnt exist.`
      ]);

    const subreddit = await fetch(`https://www.reddit.com/r/${subredditName}/about.json`)
      .then((res) => res.json())
      .then((body) => {
        if (body.kind === "t5") return body.data;
      })
      .catch(() => { throw message.channel.send(errorembed) });

    if (!subreddit) return message.channel.send(errorembed);

    const embed = new MessageEmbed()
      .setTitle(subreddit.title)
      .setDescription(subreddit.public_description)
      .setURL(`https://www.reddit.com/r/${subredditName}/`)
      .setColor(message.guild.me.displayHexColor || 'RANDOM')
      .setThumbnail(subreddit.icon_img)
      .setImage(subreddit.banner_img)
      .addField("Subscribers", subreddit.subscribers.toLocaleString(), true)
      .addField("Users Active", subreddit.accounts_active.toLocaleString(), true)
      .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp();

    if (subreddit) return message.channel.send(embed);
  }
}
