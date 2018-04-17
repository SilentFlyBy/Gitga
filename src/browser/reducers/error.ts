import { IErrorState } from "../store/git-store";
import { ErrorAction } from "../actions";
import { COMMIT_FAILURE, COMMIT_SUCCESS } from "../actions/commit";
import { SYNC_FAILURE } from "../actions/sync";
import { OPEN_REPOSITORY_FAILURE } from "../actions/repository";

const initialState: IErrorState = {
    Error: undefined,
};

export function ErrorReducer(state: IErrorState = initialState, action: ErrorAction) {
    switch (action.type) {
        case COMMIT_FAILURE:
            return { ...state, Error: action.error };
        case SYNC_FAILURE:
            return { ...state, Error: action.error };
        case OPEN_REPOSITORY_FAILURE:
            return { ...state, Error: action.error };
        default: return state;
    }
}
