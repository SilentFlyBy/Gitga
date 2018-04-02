import { IStoreState } from "../store/git-store";
import NotificationComponent, { INotificationProps } from "../components/app/notification";
import {NotificationClear} from "../actions/notification";
import { connect } from "react-redux";

const mapStateToProps = (state: IStoreState): INotificationProps => {
    return {
        Notifications: state.NotificationState.map((n) => {
            return {
                Message: n.Message,
                Type: n.Type,
                Timestamp: n.Timestamp,
            };
        }),
    };
};

const mapDispatchToProps = (dispatch: any): INotificationProps => {
    return {
        onNotificationClear: (index: number) => dispatch(NotificationClear(index)),
    };
};

const Notification = connect(mapStateToProps, mapDispatchToProps)(NotificationComponent);

export default Notification;
