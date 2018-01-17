var Discord = require('discord.js');
global.logger = require('winston');


global.commandCharacter = '%'; //Set your bot especial character
global.defaultChannelName = 'general' //Your "Server's main channel's name

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
global.bot = new Discord.Client();