const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const fetch = require('node-fetch');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Get an Anime Avatar',
      extras: "The output will be NSFW only if the channel is a NSFW channel",
      category: 'Anime'
    });
  }

  async run(message) {

    const { url } = await fetch(`https://nekos.life/api/v2/img/${message.channel.nsfw ? "nsfw_" : ""}avatar`)
      .then((res) => res.json());

    const embed = new MessageEmbed()
      .setTitle(`${message.channel.nsfw ? "NSFW " : ""}Anime Avatar`)
      .setColor(message.guild.me.displayHexColor || 'RANDOM')
      .setImage(url)
      .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp();

    return message.channel.send(embed);
  }
}