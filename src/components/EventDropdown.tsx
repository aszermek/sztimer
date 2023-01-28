import { observer } from "mobx-react";
import * as React from "react";
import { Events } from "../models/Events";
import MainStore from "../stores/MainStore";
import Dropdown, { IDropdownOption } from "./UI/Dropdown";

export interface IEventDropdownProps {
    MainStore?: MainStore;
}

class EventDropdown extends React.Component<IEventDropdownProps> {
    onChanged = (key: string | number, option: IDropdownOption) => {
        this.props.MainStore.update("selectedEvent", key);
        this.props.MainStore.ScrambleStore.scrambleGenerator();
    };

    render() {
        const MainStore = this.props.MainStore;
        const selectedEvent = MainStore.selectedEvent;
        

        const options = Events.map((event) => {
            return {
                key: event.key,
                value: event.label,
            };
        });

        return <Dropdown options={options} label="Event" selectedKey={selectedEvent} onChanged={this.onChanged} />;
    }
}

export default observer(EventDropdown);
