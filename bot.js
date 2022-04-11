require('./config');
const { Client, Intents } = require('discord.js');
var auth = require('./private/auth.json');
var special = require('./special');
var Commands = require('./commands');

// Initialize Discord Bot
global.bot = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });

bot.once('ready', () => {
	logger.info('Connected');
	logger.info('Logged in as: ' + bot.user.username + ' - (' + bot.user.id + ')');
	bot.user.setActivity(lang.bot_activity);
});

bot.on('messageCreate', (message) => {
	if (message.author.bot)
		return; //lets ignore messages from bots.

	if (message.content[0] == conf.character) {
		var args = message.content.substring(1).split(' ');
		let success = Commands.execute(args, message);

		if (success)
			message.react("👍");

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