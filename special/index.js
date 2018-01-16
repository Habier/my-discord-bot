let master = require('../private/master.json');
let Asesino = require('./modes/asesino');

let locked = true;
let isGameOn = false;

let gameInstance;

exports.comms = function(args, message) {
  if (isGameOn) {
    gameInstance.execute(args, message);
  } else
    switch (args[0]) {
      case "comenzar":
        if (message.author.id != master.id)
          return; // ignoring the others

        locked = false;
        gameInstance = new Asesino.GameInstance(message.channel);
        gameInstance.game.send('Comenzando jueguino, usa join para entrar.\n¡Tienes 50 segundos¡');

        setTimeout(function() {
          locked = true;

          gameInstance.game.send('Comienza el juego');
          gameInstance.game.shuffle();
          isGameOn = true;
          gameInstance.start();
        }, 50000);
        break;

      case "join":
        if (!locked) {
          {
            gameInstance.addPlayer(message.author);
          }
        }
        break;
    }

}