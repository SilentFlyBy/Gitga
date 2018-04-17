import { IStoreState } from "../store/git-store";
import { connect } from "react-redux";
import { CommitComponent, ICommitComponentProps } from "../components/app/commit";
import { ChangeCommitMessage, Commit } from "../actions/commit";

const mapStateToProps = (state: IStoreState): ICommitComponentProps => {
    return {
        commitMessage: state.CommitMessage.CommitMessage,
    };
};

const mapDispatchToProps = (dispatch: any): ICommitComponentProps => {
    return {
        onCommitMessageChange: (message: string) => dispatch(ChangeCommitMessage(message)),
        onCommit: () => dispatch(Commit()),
    };
};

const CommitArea = connect(mapStateToProps, mapDispatchToProps)(CommitComponent);

export default CommitArea;
