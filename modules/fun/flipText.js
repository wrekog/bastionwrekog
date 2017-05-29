/**
 * @file flipText command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license MIT
 */

const flipText = require('../../data/flipText.json');

exports.run = (Bastion, message, args) => {
  if (args.length < 1) {
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

  args = args.join(' ');
  for (let i = 0; i < Object.keys(flipText).length; i++) {
    args = args.replace(Object.keys(flipText)[i], flipText[Object.keys(flipText)[i]]);
  }

  message.channel.send({
    embed: {
      color: Bastion.colors.blue,
      title: 'Flipped Text:',
      description: args.split('').reverse().join('')
    }
  }).catch(e => {
    Bastion.log.error(e.stack);
  });
};

exports.config = {
  aliases: [],
  enabled: true
};

exports.help = {
  name: 'fliptext',
  description: 'Flips a given text.',
  botPermission: '',
  userPermission: '',
  usage: 'fliptext <text>',
  example: [ 'fliptext This is Upside Down!' ]
};
