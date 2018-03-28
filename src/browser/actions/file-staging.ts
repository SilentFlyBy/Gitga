import { IFileStatus, Status } from "../../core/git/file-status";
import * as Git from "nodegit";
import { Sync } from "./sync";
import { IAreaFileStatus } from "../components/app/file-status/file-status-area";

export const STAGE_FILE = "STAGE_FILE";
export type STAGE_FILE = typeof STAGE_FILE;

export const UNSTAGE_FILE = "UNSTAGE_FILE";
export type UNSTAGE_FILE = typeof UNSTAGE_FILE;

export interface IStageFiles {
    type: STAGE_FILE;
    newFileStates: IFileStatus[];
}

export interface IUnstageFiles {
    type: UNSTAGE_FILE;
    newFileStates: IFileStatus[];
}

export type FileStagingAction = IStageFiles | IUnstageFiles;

export function StageFile(files: IAreaFileStatus[]) {
    return async (dispatch: any) => {
        const repo = await Git.Repository.open(".");
        const index = await repo.refreshIndex();

        await Promise.all(files.map((f) => {
            if (f.Status === Status.Deleted) {
                return index.removeByPath(f.Path1);
            }

            return index.addByPath(f.Path1);
        }));
        await index.write();
        dispatch(Sync());
    };
}

export function UnstageFile(files: IAreaFileStatus[]) {
    return async (dispatch: any) => {
        const repo = await Git.Repository.open(".");
        const head = await repo.getHeadCommit();
        const obj = await Git.Object.lookup(repo, head.id(), 1);
        const index = await repo.refreshIndex();

        await Git.Reset.default(repo, obj, files.map((f) => f.Path1));

        await index.write();
        dispatch(Sync());
    };
}
