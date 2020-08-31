const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const fetch = require("node-fetch");

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      aliases: ['memes'],
      description: 'Meme reddit.',
      category: 'Reddit'
    });
  }

  async run(message) {
    const subReddits = ["dankmemes", "meme", "memes", "animemes", "MemesOfAnime", "animememes", "AnimeFunny", "dankmeme", "wholesomememes", "MemeEconomy", "techsupportanimals", "meirl", "me_irl", "2meirl4meirl", "AdviceAnimals", "ShitPostCrusaders"]
    const random = subReddits[Math.floor(Math.random() * subReddits.length)]

    const data = await fetch(`https://www.reddit.com/r/${random}/random.json`)
      .then((res) => res.json())
      .then((body) => {
        if (body.error) throw this.errorMessage;
        return body[0].data.children[0].data;
      })

    const memeEmbed = new MessageEmbed()
      .setColor(message.guild.me.displayHexColor || 'RANDOM')
      .setImage(`${data.url}`)
      .setTitle(`From r/${random}`)
      .setURL(`https://www.reddit.com/r/${random}`)
      .setDescription([
        `${data.title}`,
        `[If the image does not load, click here!](${data.url})`])
      .addField('Reddit Post Rating', [
        `👍 ${data.ups} \xa0\ • \xa0\ 👎 ${data.downs}`
      ])
      .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp();

    message.channel.send(memeEmbed);
  }
}