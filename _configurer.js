var Discord = require('discord.js');
global.logger = require('winston');

//Set your bot especial character
global.commandCharacter = '%';

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
global.bot =  new Discord.Client();