import * as React from "react";
import * as ReactDOM from "react-dom";

import FileStates from "../../containers/file-status";
import CommitArea from "../../containers/commit";
import Toolbar from "../../containers/toolbar";
import { IStoreState } from "../../store/git-store";
import { connect } from "react-redux";

export default class AppComponent extends React.Component<IAppProps, any> {

    constructor(props: IAppProps) {
        super(props);
    }

    public componentDidMount() {
        this.onInit();
    }

    public render() {
        return (
            <div>
                <Toolbar />
                <FileStates />
                <CommitArea />
            </div>
        );
    }

    private onSync = () => {
        if (typeof this.props.onSync === "function") {
            this.props.onSync();
        }
    }

    private onInit = () => {
        if (typeof this.props.onInit === "function") {
            this.props.onInit();
        }
    }
}

export interface IAppProps {
    getGitRepo?: (path: string) => void;
    onSync?: () => void;
    onInit?: () => void;
}
