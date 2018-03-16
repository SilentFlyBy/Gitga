import * as React from "react";
import * as ReactDOM from "react-dom";

import FileStates from "../../containers/file-status";
import Toolbar from "../../containers/toolbar";
import { IStoreState } from "../../store/git-store";
import { FindGit } from "../../actions/find-git";
import { connect } from "react-redux";

class AppComponent extends React.Component<IAppProps, any> {

    constructor(props: IAppProps) {
        super(props);
    }

    public componentDidMount() {
        this.getGitPath();
    }

    public render() {
        return (
            <div>
                <Toolbar />
                <FileStates />
            </div>
        );
    }

    private getGitPath() {
        if (typeof this.props.getGitPath === "function") {
            this.props.getGitPath();
        }
    }
}

interface IAppProps {
    getGitPath?: () => void;
}

const mapStateToProps = (state: IStoreState): IAppProps => {
    return {};
};

const mapDispatchToProps = (dispatch: any): IAppProps => {
    return {
        getGitPath: dispatch(FindGit()),
    };
};

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
export default App;
