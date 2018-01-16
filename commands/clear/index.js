///Function that makes the command functional.
exports.exe = function(args, message) {

  message.channel.fetchMessages({
      limit: 3
    })
    .then(function(messages) {
      //console.log(messages)
    let array =  messages.array();
      for (var i in array) {
        console.log(array[i]);
        if (array[i].author.id == bot.user.id) {
          array[i].delete();
        }
      }
    }).catch(function(reason) {
      console.log('clear: error-->' + reason);
    });

}

///String to explain the command
exports.man = function() {
  return "Deberia borrar mensajes antiguos del bot pero no funciona :D";
}