import * as React from "react";

import FileStates from "../../containers/file-status";
import CommitArea from "../../containers/commit";
import Toolbar from "../../containers/toolbar";
import Notification from "../../containers/notification";
import FileView from "../../containers/file-view";

export default class AppComponent extends React.Component<IAppProps, any> {

    constructor(props: IAppProps) {
        super(props);
    }

    public componentDidMount() {
        this.onInit();
    }

    public render() {
        return (
            <div className="app">
                <Notification />
                <Toolbar />
                <div>
                    <FileStates />
                    <CommitArea />
                </div>
                <FileView />
            </div>
        );
    }

    private onInit = () => {
        if (typeof this.props.onInit === "function") {
            this.props.onInit();
        }
    }
}

export interface IAppProps {
    getGitRepo?: (path: string) => void;
    onInit?: () => void;
}
