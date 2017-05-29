/**
 * @file textUnMute command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license MIT
 */

const sql = require('sqlite');
sql.open('./data/Bastion.sqlite');

exports.run = (Bastion, message, args) => {
  if (!message.member.hasPermission('MUTE_MEMBERS')) return Bastion.log.info('User doesn\'t have permission to use this command.');
  if (!message.guild.me.hasPermission('MANAGE_ROLES')) {
    return message.channel.send({
      embed: {
        color: Bastion.colors.red,
        description: `I need **${this.help.botPermission}** permission to use this command.`
      }
    }).catch(e => {
      Bastion.log.error(e.stack);
    });
  }

  if (!message.guild.available) return Bastion.log.info(`${message.guild.name} Guild is not available. It generally indicates a server outage.`);
  let user = message.mentions.users.first();
  if (!user) {
    return message.channel.send({
      embed: {
        color: Bastion.colors.yellow,
        title: 'Usage',
        description: `\`${Bastion.config.prefix}${this.help.usage}\``
      }
    }).catch(e => {
      Bastion.log.error(e.stack);
    });
  }

  if (message.author.id !== message.guild.ownerID && message.member.highestRole.comparePositionTo(message.guild.members.get(user.id).highestRole) <= 0) return Bastion.log.info('User doesn\'t have permission to use this command on that role.');

  message.channel.permissionOverwrites.get(user.id).delete().then(() => {
    let reason = args.slice(1).join(' ');
    if (reason.length < 1) {
      reason = 'No reason given';
    }

    message.channel.send({
      embed: {
        color: Bastion.colors.green,
        title: 'Text unmuted',
        fields: [
          {
            name: 'User',
            value: user.tag,
            inline: true
          },
          {
            name: 'ID',
            value: user.id,
            inline: true
          },
          {
            name: 'Reason',
            value: reason,
            inline: false
          }
        ]
      }
    }).catch(e => {
      Bastion.log.error(e.stack);
    });

    sql.get(`SELECT modLog, modLogChannelID, modCaseNo FROM guildSettings WHERE guildID=${message.guild.id}`).then(row => {
      if (!row) return;

      if (row.modLog === 'true') {
        message.guild.channels.get(row.modLogChannelID).send({
          embed: {
            color: Bastion.colors.green,
            title: 'Text unmuted user',
            fields: [
              {
                name: 'User',
                value: `${user}`,
                inline: true
              },
              {
                name: 'User ID',
                value: user.id,
                inline: true
              },
              {
                name: 'Channel',
                value: `${message.channel}`
              },
              {
                name: 'Reason',
                value: reason
              },
              {
                name: 'Responsible Moderator',
                value: `${message.author}`,
                inline: true
              },
              {
                name: 'Moderator ID',
                value: message.author.id,
                inline: true
              }
            ],
            footer: {
              text: `Case Number: ${row.modCaseNo}`
            },
            timestamp: new Date()
          }
        }).then(() => {
          sql.run(`UPDATE guildSettings SET modCaseNo=${parseInt(row.modCaseNo) + 1} WHERE guildID=${message.guild.id}`).catch(e => {
            Bastion.log.error(e.stack);
          });
        }).catch(e => {
          Bastion.log.error(e.stack);
        });
      }
    }).catch(e => {
      Bastion.log.error(e.stack);
    });
  }).catch(e => {
    Bastion.log.error(e.stack);
  });
};

exports.config = {
  aliases: [ 'tum' ],
  enabled: true
};

exports.help = {
  name: 'textunmute',
  description: 'UnMutes a previously muted user in a channel with an optional reason.',
  botPermission: 'Manage Roles',
  userPermission: 'Mute Members',
  usage: 'textUnMute @user-mention [Reason]',
  example: [ 'textUnMute @user#0001 Reason for the unmute.' ]
};
