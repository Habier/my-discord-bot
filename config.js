global.conf = {};
conf.character = '%'; //Set your bot especial character
conf.defaultChannel = 'general' //Your "Server's main channel's name
conf.enable_greeting = false;

global.lang = require('./lang/spanish').lang;
global.masters = require('./Services/masters');
var winston = require('winston');
global.logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logfile.log' })
    ]
});

logger.level = 'debug';
