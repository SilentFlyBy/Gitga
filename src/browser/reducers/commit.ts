import { ICommitMessageState } from "../store/git-store";
import { CommitMessageChange, COMMIT_MESSAGE_CHANGE } from "../actions/commit";

const initialStoreCommitMessageState: ICommitMessageState = {
    CommitMessage: "",
};

export function CommitMessageChange(
    state: ICommitMessageState = initialStoreCommitMessageState,
    action: CommitMessageChange,
): ICommitMessageState {
    switch (action.type) {
        case COMMIT_MESSAGE_CHANGE:
            return { ...state, CommitMessage: action.message };
    }

    return state;
}
