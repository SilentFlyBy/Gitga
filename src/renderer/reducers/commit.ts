import { ICommitMessageState } from "../store/git-store";
import { Commit, COMMIT_MESSAGE_CHANGE } from "../actions/commit";

const initialStoreCommitMessageState: ICommitMessageState = {
    CommitMessage: "",
};

export function CommitReducer(
    state: ICommitMessageState = initialStoreCommitMessageState,
    action: Commit,
): ICommitMessageState {
    switch (action.type) {
        case COMMIT_MESSAGE_CHANGE:
            return { ...state, CommitMessage: action.message };
        default:
            return state;
    }
}
