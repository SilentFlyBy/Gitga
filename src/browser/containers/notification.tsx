import { IStoreState } from "../store/git-store";
import NotificationComponent, { INotificationProps } from "../components/app/notification";
import {NotificationClear} from "../actions/notification";
import { connect } from "react-redux";

const mapStateToProps = (state: IStoreState): INotificationProps => {
    return {
        Message: state.NotificationState.Message,
        Type: state.NotificationState.Type,
        Time: 3000,
    };
};

const mapDispatchToProps = (dispatch: any): INotificationProps => {
    return {
        onNotificationClear: () => dispatch(NotificationClear()),
    };
};

const Notification = connect(mapStateToProps, mapDispatchToProps)(NotificationComponent);

export default Notification;
