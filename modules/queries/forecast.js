/**
 * @file forecast command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license MIT
 */

const weather = require('weather-js');

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
  weather.find({ search: args.join(' '), degreeType: 'C' }, function(err, result) {
    if (err) return;

    if (!result || result.length < 1) {
      return message.channel.send({
        embed: {
          color: Bastion.colors.red,
          description: 'No weather data received, please try again later.'
        }
      }).catch(e => {
        Bastion.log.error(e.stack);
      });
    }

    let fields = [];
    for (let i = 0; i < result[0].forecast.length; i++) {
      fields.push({
        name: new Date(result[0].forecast[i].date).toDateString(),
        value: `**Condition:** ${result[0].forecast[i].skytextday}\n**Low:** ${result[0].forecast[i].low} \u00B0${result[0].location.degreetype}\n**Hign:** ${result[0].forecast[i].high} \u00B0${result[0].location.degreetype}\n**Precipitation:** ${result[0].forecast[i].precip} cm`
      });
    }

    message.channel.send({
      embed: {
        color: Bastion.colors.blue,
        title: 'Weather Forecast',
        description: result[0].location.name,
        fields: fields,
        footer: {
          text: 'Powered by MSN Weather'
        }
      }
    }).catch(e => {
      Bastion.log.error(e.stack);
    });
  });
};

exports.config = {
  aliases: [ 'wefc' ],
  enabled: true
};

exports.help = {
  name: 'forecast',
  description: 'Shows weather forecast for 5 days for a specified location by name or ZIP Code.',
  botPermission: '',
  userPermission: '',
  usage: 'forecast <city [, country_code]|zipcode>',
  example: [ 'forecast London, UK', 'forecast 94109' ]
};
