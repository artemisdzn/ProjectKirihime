const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

      constructor(...args) {
            super(...args, {
                  description: "Bans a user that isn't in the server. The user must have ban member permission to use this command.",
                  usage: '<userID> [reason]',
                  aliases: ['hban'],
                  category: 'Moderation'
            });
      }

      async run(message, [id, ...reason]) {

            if (!message.guild.member(message.author).hasPermission(['BAN_MEMBERS', 'KICK_MEMBERS'])) return message.channel.send('You do not have permission to do this!');

            if (!id) return message.channel.send(`Who do you want to prevent from joining this server?`);

            if (isNaN(parseInt(id))) return message.channel.send("Invalid user id.");

            reason = reason.join(" ") || undefined;

            if (message.guild.member(message.author).hasPermission(['BAN_MEMBERS', 'KICK_MEMBERS'])) {

                  try {
                        const user = await message.guild.members.ban(id, reason);
                        const embed = new MessageEmbed()
                              .setTitle(`Banned ${user.tag} (${user.id})`)
                              .setDescription(`> Reason: ${reason}`)
                              .setColor(message.guild.me.displayHexColor || 'RANDOM')
                              .setThumbnail(this.client.user.displayAvatarURL())
                              .setFooter(`${message.author.tag}`)
                              .setTimestamp();
                        return message.channel.send(embed);
                  } catch (err) {
                        return message.channel.send("Couldn't ban that user, make sure the ID is valid.");
                  }

            }

      }

};
