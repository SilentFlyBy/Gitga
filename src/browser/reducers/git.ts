import {IStoreGitPathState} from "../store/git-store";
import { FindGit, FIND_GIT_SUCCESS, FIND_GIT_FAILURE } from "../actions/find-git";

const initialStoreGitPathState: IStoreGitPathState = {
    GitPath: "",
    Error: null,
};

export function FindGitResult(state: IStoreGitPathState = initialStoreGitPathState,
                              action: FindGit): IStoreGitPathState {
    switch (action.type) {
        case FIND_GIT_SUCCESS:
            return {...state, GitPath: action.gitPath};
        case FIND_GIT_FAILURE:
            return {...state, Error: action.error};
    }

    return state;
}
