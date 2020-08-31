const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

      constructor(...args) {
            super(...args, {
                  aliases: [],
                  description: 'Kicks a member. The user must have kick members permission to use this command.',
                  usage: '<@user> [reason]',
                  aliases: ['skick'],
                  category: 'Moderation'
            });
      }

      async run(message, [member, ...reason]) {

            member = await this.verifyMember(message, member);

            if (!message.guild.member(message.author).hasPermission('KICK_MEMBERS')) return message.channel.send('You do not have permission to do this!');

            if (member.id === message.author.id) return message.channel.send("Why would you kick yourself?");
            if (member.id === this.client.user.id) return message.channel.send("Why would you kick me?");
            if (member.id === message.guild.ownerID) return message.channel.send("You can't kick the owner.");

            if (!member.id) return message.channel.send("Who do you want to kick out from the server?");

            if (message.member.roles.highest.position > message.author.roles.highest.position) return message.channel.send("You cannot kick this user.");
            if (!member.kickable) return message.channel.send("I cannot kick this user.");

            const options = {};
            reason = reason.length ? reason.join(" ") : null;
            if (reason) options.reason = reason;

            const embed = new MessageEmbed()
                  .setTitle(`You've been kicked in **${message.guild.name}**`)
                  .setDescription(`> Reason: ${reason}`)
                  .setColor(message.guild.me.displayHexColor || 'RANDOM')
                  .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
                  .setFooter(`${message.author.tag}`)
                  .setTimestamp();

            await member.kick(options);
            if (message.guild.member(message.author).hasPermission('KICK_MEMBERS')) {
                  await member.send(embed);
                  return message.channel.send(`${member.user.tag} got kicked.${reason ? ` With reason of: ${reason}` : ""}`);
            }

      }

};
