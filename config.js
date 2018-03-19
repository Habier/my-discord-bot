global.conf = {};
conf.character = '%'; //Set your bot especial character
conf.defaultChannel = 'general' //Your "Server's main channel's name
conf.enable_greeting = false;

global.lang = require('./lang/spanish').lang;
global.logger = require('winston');
global.masters = require('./Services/masters');

