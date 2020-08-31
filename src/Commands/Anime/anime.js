const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const fetch = require('node-fetch');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Search an Anime',
      usage: "<title>, [page]",
      category: 'Anime'
    });
  }

  async run(message, args) {

    const errorembed = new MessageEmbed()
      .setColor(message.guild.me.displayHexColor || 'RANDOM')
      .setTitle(`Anime Does Not Exist!`)
      .setFooter(`Bot developed by アルテミス#2780`, this.client.guilds.resolve('740450115202056192').members.resolve('278136676574953472').user.displayAvatarURL({ dynamic: true }))
      .setDescription([
        `[Invite Me](https://discord.com/oauth2/authorize?client_id=727057927596277821&scope=bot&permissions=2146958847) | [Community Server](https://discord.gg/fY3tnh7) | [Support Server](https://discord.gg/a2UdmhH) | [Hangout Server](https://discord.gg/ygxFdJP)`,
        `There was an error. Anime doesnt exist.`
      ]);

    if (!args.length) return message.channel.send(errorembed);

    let [title, page = 1] = args.join(" ").split(", ");

    const { data } = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(title)}`)
      .then((r) => r.json());

    if (!data || !data.length) return message.channel.send(errorembed);

    const res = data[page - 1];
    if (!res) return message.channel.send(`Invalid page ${page} there is only ${data.length} pages.`);

    const embed = new MessageEmbed()
      .setColor(message.guild.me.displayHexColor || 'RANDOM')
      .setTitle(res.attributes.titles.en ? `${res.attributes.titles.en} (Japanese: ${res.attributes.titles.en_jp})` : res.attributes.titles.en_jp)
      .setDescription(res.attributes.synopsis)
      .addField("Age Rating", `${res.attributes.ageRating}${res.attributes.ageRatingGuide ? ` (${res.attributes.ageRatingGuide})` : ""}`)
      .addField("Episodes", `${res.attributes.episodeCount} (${res.attributes.episodeLength} Min Per Episode)`)
      .addField(`\u200b`, `Page ${page}/${data.length}`)
      .setImage(res.attributes.coverImage && res.attributes.coverImage.original)
      .setThumbnail(res.attributes.posterImage && res.attributes.posterImage.original)
      .setURL(`https://kitsu.io/anime/${res.id}`)
      .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp();

    return message.channel.send(embed);
  }
}