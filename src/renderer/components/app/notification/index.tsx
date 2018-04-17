import * as React from "react";
import Octicon from "react-component-octicons";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export default class NotificationComponent extends React.Component<INotificationProps, any> {
    private timeouts: ITimeoutEntry[] = [];

    constructor(props: INotificationProps) {
        super(props);
    }

    public componentDidUpdate() {
        for (const n of this.props.Notifications) {
            const existingEntry = this.timeouts.find((t) => t.id === n.Timestamp);
            if (existingEntry === undefined) {
                const timeout = setTimeout(() => {
                    this.onNotificationClear(n.Timestamp);
                }, 3000);

                this.timeouts.push({timeout, id: n.Timestamp});
            }
        }
    }

    public render() {
        return (
            <TransitionGroup className="notification-list">
                {this.props.Notifications.map((n) => (
                    <CSSTransition
                        key={n.Timestamp}
                        timeout={500}
                        classNames="fade"
                    >

                        <div
                            className={[
                                "notification",
                                NotificationType[n.Type].toLowerCase(),
                            ].join(" ")} key="content">

                            <span key="message">{n.Message}</span>
                            <button onClick={
                                () => this.onNotificationClear(n.Timestamp)
                            } key="button">
                                <Octicon name="x" key="close" />
                            </button>
                        </div>

                    </CSSTransition>
                ))}
            </TransitionGroup>
        );
    }

    private onNotificationClear = (time: number) => {
        const timeout = this.timeouts.find((t) => t.id === time);
        clearTimeout(timeout.timeout);
        this.timeouts = this.timeouts.filter((t) => t.id !== time);

        if (typeof this.props.onNotificationClear === "function") {
            this.props.onNotificationClear(time);
        }
    }
}

export interface INotificationProps {
    Notifications?: INotification[];
    onNotificationClear?: (index: number) => void;
}

export interface INotification {
    Message?: string;
    Type?: NotificationType;
    Timestamp: number;
}

export enum NotificationType {
    Success,
    Advice,
    Warning,
    Error,
}

interface ITimeoutEntry {
    timeout: any;
    id: number;
}
