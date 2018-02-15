require('./_configurer');
var auth = require('./private/auth.json');
var special = require('./special');
var Commands = require('./commands');

bot.on('ready', () => {
	logger.info('Connected');
	logger.info('Logged in as: ' + bot.user.username + ' - (' + bot.user.id + ')');
	bot.user.setActivity(lang.bot_activity);
});

bot.on('message', (message) => {

	if (message.author.bot)
		return; //lets ignore messages from bots.

	if (message.content[0] == commandCharacter) {
		var args = message.content.substring(1).split(' ');
		Commands.execute(args, message);
		special.comms(args, message);
	}

});

bot.on('guildMemberAdd', member => {
	// Send the message to the channel specified in _configurer.js
	let channel = member.guild.channels.find('name', defaultChannelName);
	if (!channel)
		return; //channel not found, better get out
	channel.send(lang.use(lang.join_welcome, member, commandCharacter + 'help'));
});

bot.login(auth.token);