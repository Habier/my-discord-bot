require('./config');
var Discord = require('discord.js');
var auth = require('./private/auth.json');
var special = require('./special');
var Commands = require('./commands');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
	colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
global.bot = new Discord.Client();

bot.on('ready', () => {
	logger.info('Connected');
	logger.info('Logged in as: ' + bot.user.username + ' - (' + bot.user.id + ')');
	bot.user.setActivity(lang.bot_activity);
});

bot.on('message', (message) => {

	if (message.author.bot)
		return; //lets ignore messages from bots.

	if (message.content[0] == conf.character) {
		var args = message.content.substring(1).split(' ');
		Commands.execute(args, message);
		special.comms(args, message);
	}

});

if (conf.enable_greeting)
	bot.on('guildMemberAdd', member => {
		// Send the message to the channel specified in _configurer.js
		let channel = member.guild.channels.find('name', conf.defaultChannel);
		if (!channel)
			return; //channel not found, better get out
		channel.send(lang.use(lang.join_welcome, member, conf.character + 'help'));
	});

bot.login(auth.token);