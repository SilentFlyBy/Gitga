import FileStatus, { IFileStatusProps } from "../components/app/file-status";
import { Status } from "../../core/git/file-status";
import { connect } from "react-redux";
import { IStoreState } from "../store/git-store";
import { StageFile, UnstageFile } from "../actions/file-staging";
import { Sync } from "../actions/sync";
import { StatusFile } from "nodegit";
import { IAreaFileStatus } from "../components/app/file-status/file-status-area";
import { FileSelect } from "../actions/file-view";

const mapStateToProps = (state: IStoreState): IFileStatusProps => {
    const stagedFileStates: IAreaFileStatus[] = state.FileState.FileState.filter((s) => s.inIndex())
        .map((s) => {
            return {
                Status: GitStatusFileToFileStatus(s),
                Path1: s.path(),
                Path2: "",
            };
        });
    const unstagedFileStates: IAreaFileStatus[] = state.FileState.FileState.filter((s) => s.inWorkingTree())
        .map((s) => {
            return {
                Status: GitStatusFileToFileStatus(s),
                Path1: s.path(),
                Path2: "",
            };
        });

    return {
        stagedFileStates,
        unstagedFileStates,
    };
};

const GitStatusFileToFileStatus = (statusFile: StatusFile): Status => {
    if (statusFile.isDeleted()) {
        return Status.Deleted;
    } else if (statusFile.isIgnored()) {
        return Status.Ignored;
    } else if (statusFile.isModified()) {
        return Status.Modified;
    } else if (statusFile.isNew()) {
        return Status.Added;
    } else if (statusFile.isRenamed()) {
        return Status.Renamed;
    } else {
        return Status.None;
    }
};

const mapDispatchToProps = (dispatch: any): IFileStatusProps => {
    return {
        onStage: (files: IAreaFileStatus[]) => dispatch(StageFile(files)),
        onUnstage: (files: IAreaFileStatus[]) => dispatch(UnstageFile(files)),
        onSync: () => dispatch(Sync()),
        onFileSelect: (file: string) => dispatch(FileSelect(file)),
    };
};

const FileStates = connect(mapStateToProps, mapDispatchToProps)(FileStatus);

export default FileStates;
