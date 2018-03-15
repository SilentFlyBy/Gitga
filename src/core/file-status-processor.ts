import { IFileStatus } from "./git/file-status";

export interface IFileStatusProcessor {
    GetAllFileStates(path?: string): Promise<IFileStatus[]>;
}
