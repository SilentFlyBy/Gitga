import * as React from "react";
import * as ReactDOM from "react-dom";

import FileStates from "../../containers/file-status";
import CommitArea from "../../containers/commit";
import Toolbar from "../../containers/toolbar";
import { IStoreState } from "../../store/git-store";
import { connect } from "react-redux";
import "octicons";
import { AppBar, IconButton } from "material-ui";
import Octicon from "react-component-octicons";

export default class AppComponent extends React.Component<IAppProps, any> {

    constructor(props: IAppProps) {
        super(props);
    }

    public componentDidMount() {
        if (typeof this.props.getGitRepo === "function") {
            this.props.getGitRepo(".");
        }
    }

    public render() {
        return (
            <div>
                <AppBar title="Gitga"
                    iconElementRight={
                        <IconButton onClick={() => this.onSync()}>
                            <Octicon name="sync" />
                        </IconButton>
                    } />
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
}

export interface IAppProps {
    getGitRepo?: (path: string) => void;
    onSync?: () => void;
}
