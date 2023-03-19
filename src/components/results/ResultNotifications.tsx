import { TrashIcon } from "@heroicons/react/24/outline";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { Events } from "../../models/Events";
import MainStore from "../../stores/MainStore";
import { ResultsStore } from "../../stores/ResultsStore";
import Button from "../UI/Button";
import Notification from "../UI/Notification";

export interface IResultNotificationsProps {
    ResultsStore?: ResultsStore;
}

class ResultNotifications extends React.Component<IResultNotificationsProps> {
    render() {
        const ResultsStore = this.props.ResultsStore;
        const notifs = ResultsStore.resultNotifications.slice(-3);

        if (!notifs.length) return null;

        return (
            <div className="flex flex-col gap-2 items-center">
                <Button small color="red" type="secondary" icon={{icon: TrashIcon}} onClick={ResultsStore.closeAllResultNotifications}>Close all notifications</Button>
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
                            {event.label} ({notif.session}) {notif.type} PB!
                        </Notification>
                    );
                })}
            </div>
        );
    }
}

export default inject('ResultsStore')(observer(ResultNotifications));
