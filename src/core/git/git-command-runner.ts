import { GitCommandBuilder } from "./git-command-builder";
import { GitCommandType, GitCommand } from "./command/git-command";
import { ChildProcess } from "../child-process";

export class GitCommandRunner {
    public static async RunCommand<T extends GitCommandType>(command: GitCommand<T>): Promise<string> {
        const commandString = GitCommandBuilder.BuildCommand(command);

        const gitExecutable = await this.TryGetGitExecutable();
        if (!gitExecutable) {
            throw new Error("Failed to find git executable");
        }

        return await ChildProcess.Execute(`"${gitExecutable}" ${commandString}`);
    }

    public static async GetGitExecutableFromPlatform(platform: string): Promise<string> {
        switch (platform) {
            case "win32":
                const exe = await ChildProcess.Execute("where git");
                return exe
                    .replace("\n", "")
                    .replace("\\", "\\\\");
            case "linux":
                const bin = await ChildProcess.Execute("which git");
                return bin
                    .replace("\n", "");
        }
    }

    public static async TryGetGitExecutable(): Promise<string> {
        if (process.env.NODE_ENV === "test") {
            return "util/git-mock/git-mock";
        }

        return this.GetGitExecutableFromPlatform(process.platform);
    }
}
