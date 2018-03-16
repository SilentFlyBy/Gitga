import * as React from "react";
import * as ReactDOM from "react-dom";

import FileStates from "../../containers/file-status";
import Toolbar from "../../containers/toolbar";

export default class App extends React.Component<any, any> {

    constructor(props: any) {
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
