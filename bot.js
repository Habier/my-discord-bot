require('./_configurer');
var auth = require('./private/auth.json');
var special = require('./special');
var Commands = require('./commands');

bot.on('ready', () => {
	logger.info('Connected');
	logger.info('Logged in as: ' + bot.user.username + ' - (' + bot.user.id + ')');
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
	// Send the message to a designated channel on a server:
	let channel = member.guild.channels.find('name', 'member-log');
	// Do nothing if the channel wasn't found on this server
	if (!channel) return;
	// Send the message, mentioning the member
	channel.send(`MUHAHAHAHAHA ${member}, ahora tu alma nos pertenece.`);
});

bot.login(auth.token);