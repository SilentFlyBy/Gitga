import {GitCommand, IGitCommand, GitCommandBuilder} from "./";
import * as CP from "child_process";


export class GitCommandRunner {
    public static async RunCommand<T extends IGitCommand>(command: GitCommand<T>): Promise<string> {
        const commandString = GitCommandBuilder.BuildCommand(command);

        const gitExecutable = await this.TryGetGitExecutable();
        if(!gitExecutable) {
            return Promise.reject("Failed to find git executable");
        }

        return new Promise<string>((resolve, reject) => {
            CP.exec(`"${gitExecutable}" ${commandString}`, (err, stdout) => {
                if(err) {
                    reject(`Execution of git command '${commandString}' failed: ${err}`);
                }
                resolve(stdout);
            });
        });
    }

    private static async TryGetGitExecutable(): Promise<string> {
        const platform = process.platform;

        return new Promise<string>((resolve, reject) => {
            switch (platform) {
                case "win32":
                    //return Promise.reject("Platform 'Windows' not supported");
                    resolve("git");
                case "linux":
                    const gitExecutable = "/usr/bin/git";
                    CP.exec(`${gitExecutable} --version`, (err, stdout) => {
                        if(err) {
                            reject(`Execution error on attempt to invoke 'which': ${err}`);
                        }
                        console.log(`Found git: ${stdout}`);
    
                        resolve(gitExecutable);
                    });
            }
        })
    }
}
