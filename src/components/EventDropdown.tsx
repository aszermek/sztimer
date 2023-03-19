import { PlusIcon } from "@heroicons/react/20/solid";
import { inject, observer } from "mobx-react";
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
        const { selectedEvent, selectedEventSessions } = MainStore;

        const optionsEvent: IDropdownOption[] = Events.map((event) => {
            return {
                key: event.key,
                value: event.label,
                icon: event.icon,
            };
        });
        const optionsSession: IDropdownOption[] = selectedEventSessions.map((session) => {
            const sessions = {
                key: session,
                value: session,
            };

            return sessions;
        });
        // optionsSession.push({
        //     key: "addSession",
        //     value: "Add session",
        //     icon: {icon: PlusIcon}
        // })

        return (
            <div className="flex gap-2">
                <Dropdown
                    options={optionsEvent}
                    label="Event"
                    initialKey={selectedEvent}
                    onChange={this.onChangeEvent}
                />
                <Dropdown
                    options={optionsSession}
                    label="Event"
                    initialKey={MainStore.selectedSession}
                    onChange={this.onChangeSession}
                    newOption
                    onSubmitNewOption={MainStore.addNewSession}
                />
            </div>
        );
    }
}

export default inject('MainStore')(observer(EventDropdown));
