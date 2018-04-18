import { IStoreState } from "../store/git-store";
import * as Git from "nodegit";
import { FileHunk } from "../../core/git/file-status/file-hunk";
import { FileLine } from "../../core/git/file-status/file-line";

export const FILE_SELECT = "FILE_SELECT";
export type FILE_SELECT = typeof FILE_SELECT;

export const FILE_UNSELECT = "FILE_UNSELECT";
export type FILE_UNSELECT = typeof FILE_UNSELECT;

export interface IFileSelect {
    type: FILE_SELECT;
    file: string;
    hunks: FileHunk[];
}

export interface IFileUnselect {
    type: FILE_UNSELECT;
}

export type FileAction = IFileSelect | IFileUnselect;

export function FileSelectAction(file: string, hunks: FileHunk[]): FileAction {
    return {
        type: FILE_SELECT,
        file,
        hunks,
    };
}

export function FileUnselectAction(): FileAction {
    return {
        type: FILE_UNSELECT,
    };
}

export function FileSelect(file: string, inIndex: boolean) {
    return async (dispatch: any, getState: () => IStoreState) => {
        const repo = getState().RepositoryState.Repository;
        const fileStatus = await repo.getStatus({pathspec: file});

        let fileHunks = [];
        if (!inIndex) {
            fileHunks = await GetDiffFromWorkdir(repo, file);
        } else {
            fileHunks = await GetDiffFromIndex(repo, file);
        }

        dispatch(FileSelectAction(file, fileHunks));
    };
}

const GetDiffFromIndex = async (repo: Git.Repository, file: string) => {
    const head = await repo.getHeadCommit();
    const headTree = await head.getTree();
    const index = await repo.index();
    const diff = await Git.Diff.treeToIndex(repo, headTree, index, {pathspec: file});

    return await GetDiff(repo, file, diff);
};

const GetDiffFromWorkdir = async (repo: Git.Repository, file: string): Promise<FileHunk[]> => {
    const index = await repo.index();
    const diff = await Git.Diff.indexToWorkdir(repo, index, {pathspec: file});

    return await GetDiff(repo, file, diff);
};

const GetDiff = async (repo: Git.Repository, file: string, diff: Git.Diff): Promise<FileHunk[]> => {
    const p = await diff.patches();
    const hunks = await p[0].hunks();

    const fileHunks = [];

    for (const h of hunks) {
        const hunk: FileHunk = {
            Lines: [],
        };

        const fileLines = await h.lines();

        for (const l of fileLines) {

            const newLineNo = l.newLineno();
            const oldLineNo = l.oldLineno();

            const line: FileLine = {
                newNumber: newLineNo,
                oldNumber: oldLineNo,
                Content: l.content(),
            };

            hunk.Lines.push(line);
        }

        fileHunks.push(hunk);
    }

    return fileHunks;
};
