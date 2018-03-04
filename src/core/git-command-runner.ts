import * as ChildProcess from "child_process";

export class GitCommandRunner {
    private gitExecutableFilePath: string;

    constructor(gitExecutableFilePath: string) {
        this.gitExecutableFilePath = gitExecutableFilePath;
    }

    public async RunCommand(command: GitCommand, parameters: string[]): Promise<string> {
        const execCommand = [command.toString(), ...parameters];
        const promise = new Promise<string>((resolve, reject) => {
            ChildProcess.execFile(this.gitExecutableFilePath, execCommand, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(data.toString());
            });
        });

        return promise;
    }
}

export enum GitCommand {
    Status = "status",
    Log = "log",
}
