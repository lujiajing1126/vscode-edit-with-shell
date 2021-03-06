
const ShellProgrammeResolver = require('../../lib/shell-programme-resolver');

describe('ShellProgrammeResolver', () => {

    const config = {
        'editWithShell.shell.linux': 'linux_SHELL_PATH',
        'editWithShell.shell.osx': 'osx_SHELL_PATH',
        'editWithShell.shell.windows': 'windows_SHELL_PATH'
    };
    const workspaceAdapter = {getConfig: path => config[path]};

    it('it returns Linux shell path user specified in their config when run on Linux', () => {
        const shellProgrammeResolver = createShellProgrammeResolver('linux');
        expect(shellProgrammeResolver.resolve()).to.eql('linux_SHELL_PATH');
    });

    it('it returns macOS shell path user specified in their config when run on macOS', () => {
        const shellProgrammeResolver = createShellProgrammeResolver('darwin');
        expect(shellProgrammeResolver.resolve()).to.eql('osx_SHELL_PATH');
    });

    it('it returns Windows shell path user specified in their config when run on Windows', () => {
        const shellProgrammeResolver = createShellProgrammeResolver('win32');
        expect(shellProgrammeResolver.resolve()).to.eql('windows_SHELL_PATH');
    });

    it('it returns Linux shell path user specified in their config when run on other OSs', () => {
        const shellProgrammeResolver = createShellProgrammeResolver('unknown_platform');
        expect(shellProgrammeResolver.resolve()).to.eql('linux_SHELL_PATH');
    });

    function createShellProgrammeResolver(platform) {
        return new ShellProgrammeResolver({workspaceAdapter, platform});
    }

});
