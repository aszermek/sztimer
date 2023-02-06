import { observer } from "mobx-react";
import * as React from "react";
import MainStore from "../../stores/MainStore";
import ResultFlagger from "../results/ResultFlagger";
import ManualTimer from "./ManualTimer";
import SpacebarTimer from "./SpacebarTimer";

export interface ITimerProps {
    MainStore?: MainStore;
}

class Timer extends React.Component<ITimerProps> {
    render() {
        const MainStore = this.props.MainStore;

        if (MainStore.TimerStore.isManualEnter) {
            return <ManualTimer TimerStore={MainStore.TimerStore} />
        }
        return <><SpacebarTimer TimerStore={MainStore.TimerStore} /><ResultFlagger
        ResultsStore={MainStore.ResultsStore}
    /></>
    }
}

export default observer(Timer);
