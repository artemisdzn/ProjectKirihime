const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

      constructor(...args) {
            super(...args, {
                  description: "Warns a member. The user must have administrator permission to use this command.",
                  usage: '<@member> <reason>',
                  category: 'Moderation'
            });
      }

      async run(message, [user, ...reason]) {

            user = await this.verifyUser(message, user);
            if (!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return message.channel.send('You do not have permission to do this!');
            if (!user) return message.channel.send("Who do you want to warn?");

            if (!reason.length) return message.channel.send("You didn't give me a reason.");

            if (user.id === message.author.id) return message.channel.send("You can't warn yourself.");
            if (user.id === this.client.user.id) return message.channel.send("Why would you try to warn me?");
            if (user.bot) return message.channel.send("You can't warn bots.");
            if (user.id === message.guild.ownerID) return message.channel.send("You can't warn the owner.");

            if (message.guild.member(message.author).hasPermission('ADMINISTRATOR')) {

                  const embed = new MessageEmbed()
                        .setTitle(`You've been warned in **${message.guild.name}**`)
                        .setDescription(`> Reason: ${reason.join(" ")}`)
                        .setColor(message.guild.me.displayHexColor || 'RANDOM')
                        .setThumbnail(message.guild.iconURL({ dynamic: true }))
                        .setFooter(`Warned by: ${message.author.tag}`)
                        .setTimestamp();

                  try {
                        await user.send(embed);
                        return message.channel.send(`I've warned ${user.tag} for: ${reason.join(" ")}`);
                  } catch (error) {
                        console.error(error);
                        return message.channel.send("I couldn't DM the user, maybe they have DMs blocked.");

                  }

            }

      }

};
