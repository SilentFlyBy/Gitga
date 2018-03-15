import { IGitCommand } from "../git-command";

export interface IRemoveCommand extends IGitCommand {
    removeCommand: any;
}
