class Volatile {

  constructor() {
    this.commands = {};
  }

  addCommand(name, action) {
    this.commands[name] = action;
  }

  execute(p, args, message) {

    for (var key in this.commands) {
      var cmd = args[0];
      if (key == cmd) {
        try {
          this.commands[key](p, args, message);
        } catch (error) {
          logger.error('Command: ' + cmd + ' has failed. Showing error:\n' + error);
          logger.error(args);
          message.channel.send('¡Oooops! ' + message.author.username + ' tu comando ha fallado.');
        }
        return true;
      }
    }
    return false; // no matching command, better report it
  }

  remove(name) {
    var index = this.commands.indexOf(name);
    if (index > -1) {
      this.commands.splice(index, 1);
    }
  }

  removeAll() {
    this.commands = [];
  }


}

exports.Volatile = Volatile;