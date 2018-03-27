import { IFileStatus } from "./git/file-status";
import * as Git from "nodegit";

export interface IFileStatusProcessor {
    GetAllFileStates(path?: string): Promise<Git.StatusFile[]>;
}
