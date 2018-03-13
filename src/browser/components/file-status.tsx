import * as React from "react";
import * as ReactDOM from "react-dom";

import {FileStatusProcessor, IFileStatus, Status} from "../../core/file-status";
import FileStatusArea, { IAreaFileStatus } from "./file-status-area";

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
        return(
            <div className="fileStatus">
                <FileStatusArea className="stagingArea" fileStates={this.state.stagedFileStates} />
                <FileStatusArea className="workspaceArea" fileStates={this.state.unstagedFileStates} />
            </div>
        );
    }

    public updateFileStatus() {
        FileStatusProcessor.GetAllFileStates().then((fileStates) => {
            const stagedFileStates = fileStates.filter((s) => s.IndexStatus !== Status.None
                                                           && s.IndexStatus !== Status.Untracked)
                .map((s) => {
                    return {
                        Status: s.IndexStatus,
                        Path1: s.Path1,
                    };
                });
            const unstagedFileStates = fileStates.filter((s) => s.WorkTreeStatus !== Status.None)
            .map((s) => {
                return {
                    Status: s.WorkTreeStatus,
                    Path1: s.Path1,
                };
            });

            this.setState({
                stagedFileStates,
                unstagedFileStates,
            });
        });
    }

}

interface IFileStatusState {
    unstagedFileStates: IAreaFileStatus[];
    stagedFileStates: IAreaFileStatus[];
}
