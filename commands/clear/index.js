///Function that makes the command functional.
exports.exe = function (args, message) {

  message.channel.messages.fetch({
    limit: 100
  })
    .then(function (messages) {
      let array = [];
      messages.each((i) => {
        if (i.author.id == bot.user.id) {
          array.push(i)
        }
      });

      message.channel.bulkDelete(array);
    }).catch(function (reason) {
      console.log('clear: error-->' + reason);
    });

}

///String to explain the command
exports.man = function () {
  return "Borra mensajes antiguos del bot si tiene ese permiso";
}