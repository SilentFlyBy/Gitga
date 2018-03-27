import { IFileStatus } from "../../core/git/file-status";
import * as Git from "nodegit";
import { AddArgument } from "../../core/git/command/add/git-add-command";
import { Sync } from "./sync";
import { CheckoutArgument } from "../../core/git/command/checkout/git-checkout-command";
import { ResetArgument } from "../../core/git/command/reset/git-reset-command";

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

export function StageFile(file: string[]) {
    return async (dispatch: any) => {
        const repo = await Git.Repository.open(".");
        const index = await repo.refreshIndex();
        await Promise.all(file.map((f) => {
            return index.addByPath(f);
        }));
        await index.write();
        dispatch(Sync());
    };
}

export function UnstageFile(file: string[]) {
    return async (dispatch: any) => {
        const repo = await Git.Repository.open(".");
        const index = await repo.refreshIndex();
        await Promise.all(file.map((f) => {
            return index.removeByPath(f);
        }));
        await index.write();
        dispatch(Sync());
    };
}
