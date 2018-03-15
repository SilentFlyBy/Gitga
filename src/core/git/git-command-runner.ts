import * as CP from "child_process";
import { GitCommandBuilder } from "./git-command-builder";
import { IGitCommand, GitCommand } from "./command/git-command";

export class GitCommandRunner {
    public static async RunCommand<T extends IGitCommand>(command: GitCommand<T>): Promise<string> {
        const commandString = GitCommandBuilder.BuildCommand(command);

        const gitExecutable = await this.TryGetGitExecutable();
        if (!gitExecutable) {
            return Promise.reject("Failed to find git executable");
        }

        return new Promise<string>((resolve, reject) => {
            CP.exec(`"${gitExecutable}" ${commandString}`, (err, stdout) => {
                if (err) {
                    reject(`Execution of git command '${commandString}' failed: ${err}`);
                }
                resolve(stdout);
            });
        });
    }

    private static async TryGetGitExecutable(): Promise<string> {
        const testing = process.env.NODE_ENV;
        const platform = testing === "test" ? testing : process.platform;

        return new Promise<string>((resolve, reject) => {
            switch (platform) {
                case "win32":
                    resolve("git");
                    break;
                case "linux":
                    const gitExecutable = "/usr/bin/git";
                    CP.exec(`${gitExecutable} --version`, (err, stdout) => {
                        if (err) {
                            reject(`Execution error on attempt to invoke 'git': ${err}`);
                        }

                        resolve(gitExecutable);
                    });
                    break;
                case "test":
                    resolve("node_modules/.bin/git-mock");
                    break;
            }
        });
    }
}
