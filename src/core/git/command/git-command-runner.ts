import {GitCommand, IGitCommand} from "./";

export class GitCommandRunner {
    public static async RunCommand<T extends IGitCommand>(command: GitCommand<T>): Promise<string> {
        return null;
    }
}
