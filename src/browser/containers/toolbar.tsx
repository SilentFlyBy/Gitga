import { connect } from "react-redux";
import ToolbarComponent, { IToolbarProps } from "../components/app/toolbar";
import { Sync } from "../actions/sync";
import { IStoreState } from "../store/git-store";
import { Push } from "../actions/push";

const mapStateToProps = (state: IStoreState) => {
    return {};
};

const mapDispatchToProps = (dispatch: any): IToolbarProps => {
    return {
        onSyncClick: () => {
            dispatch(Sync());
        },
        onPushClick: () => {
            dispatch(Push());
        },
    };
};

const Toolbar = connect(mapStateToProps, mapDispatchToProps)(ToolbarComponent);

export default Toolbar;
