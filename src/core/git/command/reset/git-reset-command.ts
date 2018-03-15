import { IGitCommand } from "../git-command";

export interface IResetCommand extends IGitCommand {
    resetCommand: any;
}
