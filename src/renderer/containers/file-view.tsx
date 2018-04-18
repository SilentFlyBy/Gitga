import { connect } from "react-redux";
import FileViewComponent, { IFileViewProps } from "../components/app/file-view";
import { IStoreState } from "../store/git-store";

const mapStateToProps = (state: IStoreState): IFileViewProps => {
    const fileState = state.SelectedFileState;

    return {
        Hunks: fileState.Hunks,
    };
};

const FileView = connect(mapStateToProps)(FileViewComponent);

export default FileView;
