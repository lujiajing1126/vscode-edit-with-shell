
class CommandReader {

    constructor(params) {
        this._historyStore = params.historyStore;
        this._vsWindow = params.vsWindow;
    }

    async read() {
        const history = this._historyStore.getAll();
        if (history.length === 0) {
            return this._vsWindow.showInputBox({
                placeHolder: 'Enter a command',
                prompt: 'No history available yet'
            });
        }

        const pickedCommand = await this._letUserToPickCommand(history);
        return this._letUserToModifyCommand(pickedCommand);
    }

    _letUserToPickCommand(history) {
        const options = {placeHolder: 'Select a command to reuse or Cancel (Esc) to write a new command'};
        return this._vsWindow.showQuickPick(history.reverse(), options);
    }

    _letUserToModifyCommand(pickedCommand) {
        const options = this._getInputBoxOption(pickedCommand);
        return this._vsWindow.showInputBox(options);
    }

    _getInputBoxOption(pickedCommand) {
        if (!pickedCommand) {
            return {placeHolder: 'Enter a command'};
        }
        return {
            placeHolder: 'Enter a command',
            prompt: 'Edit the command if necessary',
            value: pickedCommand
        };
    }

}

module.exports = CommandReader;
