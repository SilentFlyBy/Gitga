import * as React from "react";
import * as ReactDOM from "react-dom";
import Octicon from "react-component-octicons";

export default class NotificationComponent extends React.Component<INotificationProps, any> {
    private timeout: any;

    constructor(props: INotificationProps) {
        super(props);
    }

    public componentDidUpdate() {
        if (this.props.Type !== undefined) {

            this.timeout = setTimeout(() => {
                this.onNotificationClear();
            }, this.props.Time || 3000);
        }
    }

    public render() {
        let notificationContainer = null;
        if (this.props.Type !== undefined) {

            const classes = [
                "notification",
                NotificationType[this.props.Type].toLowerCase(),
            ];

            notificationContainer =
                    <div className={classes.join(" ")} key="content">
                        <span key="message">{this.props.Message}</span>
                        <button onClick={() => this.onNotificationClear()} key="button">
                            <Octicon name="x" key="close" />
                        </button>
                    </div>;
        }

        return (
            notificationContainer
        );
    }

    private onNotificationClear = () => {
        clearTimeout(this.timeout);
        if (typeof this.props.onNotificationClear === "function") {
            this.props.onNotificationClear();
        }
    }
}

export interface INotificationProps {
    Message?: string;
    Type?: NotificationType;
    Time?: number;
    onNotificationClear?: () => void;
}

export enum NotificationType {
    Success,
    Advice,
    Warning,
    Error,
}
