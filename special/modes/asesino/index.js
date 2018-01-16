/***
A game where everyone is an assasin.
you must chose a target to attack and a target to defend from
If the one chesen to be defended attacks you, then kill him.
If the one attacked by you defends against you, you die.
***/
var Volatile = require('../../lib/Volatile').Volatile;
var Gamerino = require('../../lib/Game');

class GameInstance {

  constructor(channel) {
    this.game = new Gamerino.Game(channel);
  }

  getGame() {
    return this.game;
  }

  addPlayer(player) {
    var p = this.game.addPlayer(player) //if no collisions are found i will get a fresh player.
    if (p) {
      p.commands = new Volatile();
      this.defaultValues(p);
      this.game.send(player.username + ' se ha unido a esta guerra');
    }
  }

  execute(args, message) {
    var p = this.game.getPlayer(message.author.id);
    if (!p)
      return; //this dude is not a player no need to continue

    this.playersOnly(p, args, message);

  }

  playersOnly(p, args, message) {
    p.commands.execute(p, args, message);
  }

  wipeCommands() {
    for (var p in this.game.players) {
      this.game.players[p].commands.removeAll();
    }
  }

  ////////------------game functions!---------------///
  defaultValues(p) {
    p.att = -1;
    p.def = -1;
    p.derp = 0;
    p.alive = true;
    p.hits = 0;
  }

  atacar(p, args, message) {
    let num = Number(args[1]);
    if (Number.isInteger(num)) {
      p.att = num;
      p.send('Si cambias de idea puedes volver a usarlo');
    } else
      p.send('Eso ni siquiera es un numero entero "' + args[1] + '"');
  }

  defender(p, args, message) {
    let num = Number(args[1]);
    if (Number.isInteger(num)) {
      p.def = num;
      p.send('Si cambias de idea puedes volver a usarlo');
    } else
      p.send('Eso ni siquiera es un numero entero"' + args[1] + '"');
  }

  notAvalidNumber(p) {
    p.send('Eso ni siquiera es un numero entero');
  }

  resolveAttack(dude, p) {
    if (dude.att == -1)
      return;

    this.game.players[dude.att].hits++;

    if (this.game.players[dude.att].def == p) {

      if (this.game.players[dude.att].derp <= dude.derp) {
        //attacker is derper or equal
        dude.alive = false;
        dude.send('Creiste que podia ser un ataque sorpresa pero te estaban esperando. Caiste en la trampa enemiga.');
      } else {
        //target is derper
        this.game.players[dude.att].alive = false;
        dude.send('¡Había una trampa preparada!\n' +
          'Pero tu víctima estaba en selección de campeon y murió eligiendo runas.');
        if (this.game.players[dude.att].derp - dude.derp > 2)
          dude.send('Te sentaste en su silla y ganaste 7lp en su cuenta. What a boosted animal...')
      }
    } else
      this.game.players[dude.att].alive = false;

  }

  resolveDerps() {

    this.derpest = -1;

    for (let p in this.game.players) {
      let dude = this.game.players[p];

      if (dude.att < 0 || dude.att >= this.game.players.length) {
        dude.derp++;
        dude.att = -1;
      }
      if (dude.def < 0 || dude.def >= this.game.players.length) {

        dude.derp++;
        dude.def = -1;
      }

      if (dude.att == p)
        dude.derp += 3; //attacked himself

      if (dude.def == p)
        dude.derp += 3; //defended from himself

      if (dude.derp > 0 && dude.derp > this.derpest)
        this.derpest = p;
    }

  }

  ///-----------GameMode Starts Here -------------------///
  start() {
    for (var p in this.game.players) {
      this.game.players[p].commands.addCommand('atacar', this.atacar);
      this.game.players[p].commands.addCommand('defender', this.defender);
    }

    this.game.send2All('Eres un asesino, y los demas jugadores también.\n' +
      'Debes protegerte de un jugador y atacar a otro.\n' +
      'Si te ataca de quien te defiendes, vivirás y el morirá. Lo mismo puede pasarte a ti al atacar.\n' +
      'usa ' + commandCharacter + 'atacar NUMERO y ' + commandCharacter + 'defender NUMERO. Aquí tienes los números:\n' +
      this.game.printablePlayerList());

    setTimeout(() => {
      this.end();
    }, 50000);
  }

  ///-----------------------ending game -----------------//
  end() {
    this.wipeCommands();
    this.game.send('Fin de partida. Calculando resultados');
    //this.game.send('Ha Ha. no está implementado');
    this.resolveDerps();

    for (let p in this.game.players) {
      let dude = this.game.players[p];
      this.resolveAttack(dude, p);
    }


    if (this.derpest >= 0)
      this.game.send('Se ha descubierto que ' + this.game.players[this.derpest].user.username + ' estaba un poco espeso que el resto.');

    var msg = '';

    for (let p in this.game.players) {
      let dude = this.game.players[p];
      dude.send('Has recibido ' + dude.hits + ' ataques');
      if (dude.alive) {
        msg += dude.user.username + '\n';
      }
    }

    if (msg === '')
      msg = 'Ningun Superviviente';
    else
      msg = 'Supervivientes:\n' + msg;

    this.game.send(msg);


  }

}
exports.GameInstance = GameInstance;