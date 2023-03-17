import { PlusIcon } from "@heroicons/react/20/solid";
import { inject, observer } from "mobx-react";
import * as React from "react";
import MainStore from "../../stores/MainStore";
import Checkbox from "../UI/Checkbox";
import Input from "../UI/Input";

export interface ISettingsProps {
    MainStore?: MainStore;
}

class Settings extends React.Component<ISettingsProps> {
    onChangeInspection = () => {
        this.props.MainStore.TimerStore.update(
            "withInspection",
            !this.props.MainStore.TimerStore.withInspection
        );
    };

    onChangeTimerEnter = () => {
        this.props.MainStore.TimerStore.update(
            "isManualEnter",
            !this.props.MainStore.TimerStore.isManualEnter
        );
    };

    render() {
        const MainStore = this.props.MainStore;

        return (
            <div className="flex flex-col p-1 gap-4">
                <div className="font-bold">Settings</div>
                <Checkbox
                    label="Inspection"
                    key="inspection"
                    value={MainStore.TimerStore.withInspection}
                    onChange={this.onChangeInspection}
                />
                <Checkbox
                    label="Enter times manually"
                    key="timerEnter"
                    value={MainStore.TimerStore.isManualEnter}
                    onChange={this.onChangeTimerEnter}
                />
                {/* <Input label="asd" icon={{icon: PlusIcon}} /> */}
            </div>
        );
    }
}

export default inject('MainStore')(observer(Settings));
