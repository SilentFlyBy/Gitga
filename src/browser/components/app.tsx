import * as React from "react";
import * as ReactDOM from "react-dom";

import Toolbar from "./toolbar";
import FileStatus from "./file-status";

import {Git} from "../../core/git";

export default class App extends React.Component<any, any> {
    private fileStatusComponent: FileStatus;

    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <div>
                <Toolbar syncAction={() => this.fileStatusComponent.updateFileStatus()}/>
                <FileStatus ref={(ref) => this.fileStatusComponent = ref}/>
            </div>
        );
    }
}
