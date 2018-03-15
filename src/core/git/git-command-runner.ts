import * as CP from "child_process";
import { GitCommandBuilder } from "./git-command-builder";
import { IGitCommand, GitCommand } from "./command/git-command";
import { ChildProcess } from "../child-process";

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

    public static async GetGitExecutableFromPlatform(platform: string): Promise<string> {
        switch (platform) {
            case "win32":
                const exe = await ChildProcess.Execute("where git");
                return exe
                    .replace("\n", "")
                    .replace("\\", "\\\\");
            case "linux":
                return await ChildProcess.Execute("which git");
        }
    }

    private static async TryGetGitExecutable(): Promise<string> {
        if (process.env.NODE_ENV === "test") {
            return "util/git-mock/git-mock";
        }

        return this.GetGitExecutableFromPlatform(process.platform);
    }
}
