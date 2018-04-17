import AppComponent, { IAppProps } from "../components/app";
import { OpenRepository, OpenInitialRepository } from "../actions/repository";
import { connect } from "react-redux";
import { Sync } from "../actions/sync";

const mapStateToProps = (): IAppProps => {
    return {};
};

const mapDispatchToProps = (dispatch: any): IAppProps => {
    return {
        getGitRepo: (path: string) => dispatch(OpenRepository(path)),
        onInit: () => dispatch(OpenInitialRepository()),
    };
};

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);

export default App;
