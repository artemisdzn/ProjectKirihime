
const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const fetch = require("node-fetch");

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      aliases: ['random', 'randreddit', 'rreddit'],
      description: 'Searches a random reddit post on a given subreddit.',
      usage: '<subreddit>',
      category: 'Reddit'
    });

  }

  async run(message, [subreddit]) {

    const errorembed = new MessageEmbed()
      .setColor(message.guild.me.displayHexColor || 'RANDOM')
      .setTitle(`Something Went Wrong`)
      .setFooter(`Bot developed by アルテミス#2780`, this.client.guilds.resolve('740450115202056192').members.resolve('278136676574953472').user.displayAvatarURL({ dynamic: true }))
      .setDescription([
        `[Invite Me](https://discord.com/oauth2/authorize?client_id=727057927596277821&scope=bot&permissions=2146958847) | [Community Server](https://discord.gg/fY3tnh7) | [Support Server](https://discord.gg/a2UdmhH) | [Hangout Server](https://discord.gg/ygxFdJP)`,
        `There was an error. Reddit may be down or the subreddit doesnt exist.`
      ]);

    if (!subreddit) return message.channel.send(errorembed);

    const data = await fetch(`https://www.reddit.com/r/${subreddit}/random.json`)
      .then((res) => res.json())
      .then((body) => {
        if (body.error) throw this.errorMessage;
        return body[0].data.children[0].data;
      })
      .catch(() => { throw message.channel.send(errorembed) });

    const memeEmbed = new MessageEmbed()
      .setAuthor(`${this.client.user.username}`, this.client.user.displayAvatarURL(), 'https://discord.gg/a2UdmhH')
      .setColor(message.guild.me.displayHexColor || 'RANDOM')
      .setImage(`${data.url}`)
      .setTitle(`From r/${subreddit}`)
      .setURL(`https://www.reddit.com/r/${subreddit}`)
      .setDescription([
        `${data.title}`,
        `[If the image does not load, click here!](${data.url})`])
      .addField('Reddit Post Rating', [
        `👍 ${data.ups} \xa0\ • \xa0\ 👎 ${data.downs}`
      ])
      .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp();

    message.channel.send(memeEmbed);

    if (data.over_18 && !message.channel.nsfw) {
      return message.channel.send("The results I found was NSFW and I cannot post it in this channel.");
    }
  }
}
