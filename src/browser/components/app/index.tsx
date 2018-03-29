import * as React from "react";
import * as ReactDOM from "react-dom";

import FileStates from "../../containers/file-status";
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

    public render() {
        return (
            <div>
                <AppBar title="Gitga"
                    iconElementRight={
                        <IconButton>
                            <Octicon name="sync" />
                        </IconButton>
                    } />
                <FileStates />
            </div>
        );
    }
}

interface IAppProps {
    getGitPath?: () => void;
}
