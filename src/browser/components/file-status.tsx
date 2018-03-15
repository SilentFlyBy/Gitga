import * as React from "react";
import * as ReactDOM from "react-dom";

import { FileStatusProcessor, IFileStatus, Status } from "../../core/git/file-status";
import FileStatusArea, { IAreaFileStatus, FileStatusAreaType } from "./file-status-area";

export default class FileStatus extends React.Component<any, IFileStatusState> {
    constructor(props: any) {
        super(props);

        this.state = {
            unstagedFileStates: [],
            stagedFileStates: [],
        };
    }

    public componentDidMount() {
        this.updateFileStatus();
    }

    public render() {
        return (
            <div className="file-status">
                <FileStatusArea
                    type={FileStatusAreaType.Index}
                    fileStates={this.state.stagedFileStates}
                    onSync={this.updateFileStatus} />

                <FileStatusArea
                    type={FileStatusAreaType.WorkTree}
                    fileStates={this.state.unstagedFileStates}
                    onSync={this.updateFileStatus} />
            </div>
        );
    }

    public updateFileStatus = async () => {
        const fileStates = await new FileStatusProcessor().GetAllFileStates();
        const stagedFileStates = fileStates.filter((s) => s.IndexStatus !== Status.None
            && s.IndexStatus !== Status.Untracked)
            .map((s) => {
                return {
                    Status: s.IndexStatus,
                    Path1: s.Path1,
                    Path2: s.Path2,
                };
            });
        const unstagedFileStates = fileStates.filter((s) => s.WorkTreeStatus !== Status.None)
            .map((s) => {
                return {
                    Status: s.WorkTreeStatus,
                    Path1: s.Path1,
                    Path2: s.Path2,
                };
            });

        this.setState({
            stagedFileStates,
            unstagedFileStates,
        });
    }

}

interface IFileStatusState {
    unstagedFileStates: IAreaFileStatus[];
    stagedFileStates: IAreaFileStatus[];
}
