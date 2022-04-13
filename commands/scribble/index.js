const { Message } = require("discord.js");
const Database = require('better-sqlite3');
const db = new Database('./private/discordBot.db');

///String to explain the command
exports.man = function () {
  return "Añade una frase al banco de datos de scribble it"
}


/**
 * ///Function that makes the command functional.
 * 
 * @param {*} args 
 * @param {Message} message 
 * @returns 
 */
exports.exe = function (args, message) {
  if (args.length < 1) {

    if (args[0] == 'all')

      return;
  }

  let row = {
    author_id: message.author.id,
    text: removeFirstWord(message.content),
    created_at: Math.floor(Date.now() / 1000),
  };

  let stmt = db.prepare("INSERT INTO scribbles (author_id, text, created_at) VALUES (?, ?, ?)");
  stmt.run(row.author_id, row.text, row.created_at);
}

function removeFirstWord(str) {
  const indexOfSpace = str.indexOf(' ');

  if (indexOfSpace === -1) {
    return '';
  }

  return str.substring(indexOfSpace + 1);
}