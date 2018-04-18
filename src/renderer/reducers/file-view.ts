import { ISelectedFileState } from "../store/git-store";
import { FileAction, FILE_SELECT, FILE_UNSELECT } from "../actions/file-view";

const initialState: ISelectedFileState = {
    Path: undefined,
    Hunks: [],
};

export function FileViewReducer(state: ISelectedFileState = initialState,
                                action: FileAction): ISelectedFileState {
    switch (action.type) {
        case FILE_SELECT:
            return {...state, Hunks: action.hunks, Path: action.file};
        case FILE_UNSELECT:
            return initialState;
        default:
            return state;
    }
}
