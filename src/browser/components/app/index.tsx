import * as React from "react";
import * as ReactDOM from "react-dom";

import FileStates from "../../containers/file-status";
import Toolbar from "../../containers/toolbar";
import { IStoreState } from "../../store/git-store";
import { FindGit } from "../../actions/find-git";
import { connect } from "react-redux";

export default class AppComponent extends React.Component<IAppProps, any> {

    constructor(props: IAppProps) {
        super(props);
    }

    public render() {
        return (
            <div>
                <Toolbar />
                <FileStates />
            </div>
        );
    }
}

interface IAppProps {
    getGitPath?: () => void;
}
