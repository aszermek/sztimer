import { observer } from "mobx-react";
import * as React from "react";
import { Events } from "../models/Events";
import MainStore from "../stores/MainStore";
import Dropdown, { IDropdownOption } from "./UI/Dropdown";

export interface IEventDropdownProps {
    MainStore?: MainStore;
}

class EventDropdown extends React.Component<IEventDropdownProps> {
    onChangeEvent = (key: string | number, option: IDropdownOption) => {
        this.props.MainStore.update("selectedEvent", key);
        // const selectedEventSessions = Events.find((event) => event.key === key).sessions;
        // this.props.MainStore.update("selectedSession", selectedEventSessions[0]);
    
        this.props.MainStore.ScrambleStore.scrambleGenerator();
    };

    onChangeSession = (key: string | number, option: IDropdownOption) => {
        this.props.MainStore.update("selectedSession", key);
    };

    render() {
        const MainStore = this.props.MainStore;
        const selectedEvent = MainStore.selectedEvent;
        const selectedEventSessions = Events.find(
            (event) => event.key === selectedEvent
        ).sessions;

        const optionsEvent = Events.map((event) => {
            return {
                key: event.key,
                value: event.label,
                icon: event.icon,
            };
        });
        const optionsSession = selectedEventSessions.map((session) => {
            return {
                key: session,
                value: session,
            };
        });

        return (
            <div className="flex gap-2">
                <Dropdown
                    options={optionsEvent}
                    label="Event"
                    selectedKey={selectedEvent}
                    onChange={this.onChangeEvent}
                />
                <Dropdown
                    options={optionsSession}
                    label="Event"
                    selectedKey={MainStore.selectedSession}
                    onChange={this.onChangeSession}
                />
            </div>
        );
    }
}

export default observer(EventDropdown);
