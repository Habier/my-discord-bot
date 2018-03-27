var forever = require('forever-monitor');

var child = new(forever.Monitor)('bot.js', {
  silent: false,
  'spinSleepTime': 120000,
  args: []
});

child.on('exit', function() {
  console.log('bot.js has exited even using forever');
});

child.start();