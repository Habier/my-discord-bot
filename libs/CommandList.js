/** Class representing a list of Commands. */
class CommandList {

  /**
   * Create an Empty Command List.
   */
  constructor() {
    this.commands = {};
  }

  /**
   * Add or Rewrite a command.
   * @param {string} name - Callable name of the command.
   * @param {function} action - Function with wirh the action the command will perform.
   */
  addCommand(name, action) {
    this.commands[name] = action;
  }

  /**
   * Executes the command.
   * @param {Array} args - Already parsed arguments of the command.
   * @param {Message} message - Original discord message.
   */
  execute(args, message) {

    for (var key in this.commands) {
      var cmd = args[0];
      if (key == cmd) {
        try {
          this.commands[key](args, message);
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

  /**
   * Remove the given command from the list.
   * @param {string} name - Callable name of the command.
   */
  remove(name) {
    var index = this.commands.indexOf(name);
    if (index > -1) {
      this.commands.splice(index, 1);
    }
  }

  /**
   * Delete every command in the list.
   */
  removeAll() {
    this.commands = [];
  }

}

exports.CommandList = CommandList;