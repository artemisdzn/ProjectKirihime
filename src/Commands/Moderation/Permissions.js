const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

      constructor(...args) {
            super(...args, {
                  description: "View all permissions of a User.",
                  usage: '[user]',
                  category: 'Moderation',
                  aliases: ['perms']
            });

      }

      async run(message, [member]) {

            member = await this.verifyMember(message, member, true);
            return message.channel.send(new MessageEmbed()
                  .setTitle(`${member.displayName}'s Permissions in #${message.channel.name} in ${message.guild.name}`)
                  .setColor(message.guild.me.displayHexColor || 'RANDOM')
                  .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
                  .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
                  .setTimestamp()
                  .setDescription(Object.entries(message.channel.permissionsFor(member).serialize())
                        .map((perms) => `${perms[1] ? "> <:toggleon:745468346786644039>" : "> <:toggleoff:745468328042037299>"} ${
                              this.client.events.get('message').friendlyPerms[perms[0]]}`)
                        .join("\n")));

      }

};
