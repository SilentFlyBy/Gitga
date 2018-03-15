import {Git} from "../git";
import {IFileStatus, Status} from "./file-status";
import { StatusArgument } from "../command/status/git-status-command";
import { IFileStatusProcessor } from "../../file-status-processor";
import { GitFileStatusParser } from "./file-status-parser";

export class FileStatusProcessor implements IFileStatusProcessor {

    public async GetAllFileStates(path?: string): Promise<IFileStatus[]> {
        const p: StatusArgument = new StatusArgument(path);
        const output = await Git.Status().Params([
            Git.StatusParam.Porcelain,
            Git.StatusParam.UntrackedFiles("all"),
        ]).Args(p).Execute();

        const lines = output.split(/\r?\n/);
        return GitFileStatusParser.ParseFileStatusLines(lines);
    }
}
