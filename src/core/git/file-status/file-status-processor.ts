// import {Git} from "../git";
import {IFileStatus, Status} from "./file-status";
import { StatusArgument } from "../command/status/git-status-command";
import { IFileStatusProcessor } from "../../file-status-processor";
import { GitFileStatusParser } from "./file-status-parser";
import * as Git from "nodegit";

export class FileStatusProcessor implements IFileStatusProcessor {

    public async GetAllFileStates(path?: string): Promise<Git.StatusFile[]> {
        const repo = await Git.Repository.open(".");
        const status = await repo.getStatus();

        return status;
    }
}
