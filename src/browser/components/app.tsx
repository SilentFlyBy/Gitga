import * as React from "react";
import * as ReactDOM from "react-dom";

import Toolbar from "./toolbar/toolbar";

import {Git} from "../../core/git";

export default class App extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            output: "",
        };
    }

    public componentDidMount() {

    }

    public render() {
        return (
            <div>

            </div>
        );
    }
}
