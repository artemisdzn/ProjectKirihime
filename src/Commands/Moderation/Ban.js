const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

      constructor(...args) {
            super(...args, {
                  description: 'Bans a member. The user must have ban member permission to use this command.',
                  usage: '<@user> [reason]',
                  category: 'Moderation'
            });
      }

      async run(message, [member, ...reason]) {

            member = await this.verifyMember(message, member);

            if (!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) return message.channel.send('You do not have permission to do this!');

            if (member.id === message.author.id) return message.channel.send("Why would you ban yourself?");
            if (member.id === this.client.user.id) return message.channel.send("Why would you ban me?");
            if (member.id === message.guild.ownerID) return message.channel.send("You can't ban the owner.");

            if (!member.id) return message.channel.send("Who do you want to ban?");

            if (message.member.roles.highest.position > message.author.roles.highest.position) return message.channel.send("You cannot ban this user.");
            if (!member.bannable) return message.channel.send("I cannot ban this user.");

            const options = { days: 7 };
            reason = reason.length ? reason.join(" ") : null;
            if (reason) options.reason = reason;

            const embed = new MessageEmbed()
                  .setTitle(`You've been banned in **${message.guild.name}**`)
                  .setDescription(`> Reason: ${reason}`)
                  .setColor(message.guild.me.displayHexColor || 'RANDOM')
                  .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
                  .setFooter(`${message.author.tag}`)
                  .setTimestamp();

            await member.ban(options);
            if (message.guild.member(message.author).hasPermission('BAN_MEMBERS')) {
                  await member.send(embed)
                  return message.channel.send(`${member.user.tag} got banned.${reason ? ` With reason of: ${reason}` : ""}`);
            }
      }

};
