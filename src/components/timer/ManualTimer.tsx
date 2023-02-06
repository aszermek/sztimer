import { observer } from "mobx-react";
import * as React from "react";
import MainStore from "../../stores/MainStore";
import { TimerStore } from "../../stores/TimerStore";
import Input from "../UI/Input";
import { TimeFormatter } from "../utils/TimeFormatter";

export interface IManualTimerProps {
    TimerStore?: TimerStore;
}

class ManualTimer extends React.Component<IManualTimerProps> {
    onSubmit = (value: string | number) => {
        this.props.TimerStore.onSubmitManualTime(value);
    };

    render() {
        const TimerStore = this.props.TimerStore;

        return <Input isTimer onSubmit={this.onSubmit} />;
    }
}

export default observer(ManualTimer);
