import { IGitCommand } from "../git-command";

export interface ICommitCommand extends IGitCommand {
    commitCommand: any;
}
