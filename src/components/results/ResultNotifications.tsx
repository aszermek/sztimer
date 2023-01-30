import { observer } from "mobx-react";
import * as React from "react";
import MainStore from "../../stores/MainStore";
import { ResultsStore } from "../../stores/ResultsStore";
import { Button } from "../UI/Button";
import Notification from "../UI/Notification";
import Modal from "../UI/Modal";
import { TimeFormatter } from "../utils/TimeFormatter";
import { Events } from "../../models/Events";

export interface IResultNotificationsProps {
    MainStore?: MainStore;
    ResultsStore?: ResultsStore;
}

class ResultNotifications extends React.Component<IResultNotificationsProps> {
    render() {
        const ResultsStore = this.props.ResultsStore;
        const notifs = ResultsStore.resultNotifications;

        return (
            <>
                {notifs.map((notif, index) => {
                    const event = Events.find(
                        (event) => event.key === notif.event
                    );
                    return (
                        <Notification
                            key={index}
                            onDismiss={() =>
                                ResultsStore.closeResultNotification(notif)
                            }
                            icon={event.icon}
                        >
                            New {event.label} ({notif.session}) {notif.type} PB!
                        </Notification>
                    );
                })}
            </>
        );
    }
}

export default observer(ResultNotifications);
