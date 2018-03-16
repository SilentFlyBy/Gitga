import FileStatus, { IFileStatusProps } from "../components/app/file-status";
import { Status } from "../../core/git/file-status";
import { connect } from "react-redux";
import { IStoreState } from "../store/git-store";
import { StageFile, UnstageFile } from "../actions/file-staging";
import { Sync } from "../actions/sync";

const mapStateToProps = (state: IStoreState): IFileStatusProps => {
    const stagedFileStates = state.FileStates.filter((s) => s.IndexStatus !== Status.None
        && s.IndexStatus !== Status.Untracked)
        .map((s) => {
            return {
                Status: s.IndexStatus,
                Path1: s.Path1,
                Path2: s.Path2,
            };
        });
    const unstagedFileStates = state.FileStates.filter((s) => s.WorkTreeStatus !== Status.None)
        .map((s) => {
            return {
                Status: s.WorkTreeStatus,
                Path1: s.Path1,
                Path2: s.Path2,
            };
        });

    return {
        stagedFileStates,
        unstagedFileStates,
    };
};

const mapDispatchToProps = (dispatch: any): IFileStatusProps => {
    return {
        onStage: (file: string) => dispatch(StageFile(file)),
        onUnstage: (file: string) => dispatch(UnstageFile(file)),
        onSync: () => dispatch(Sync()),
    };
};

const FileStates = connect(mapStateToProps, mapDispatchToProps)(FileStatus);

export default FileStates;
