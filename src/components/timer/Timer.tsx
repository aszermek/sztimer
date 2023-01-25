import { action, makeAutoObservable, makeObservable, observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { IPenaltyTypes, IResult } from "../../models/IResult";
import MainStore from "../../stores/MainStore";
import { ResultsStore } from "../../stores/ResultsStore";
import { TimerStore } from "../../stores/TimerStore";
import { TimeFormatter } from "../utils/TimeFormatter";

export interface ITimerProps {
    MainStore?: MainStore;
    TimerStore?: TimerStore;
    inspection: boolean;
}

class Timer extends React.Component<ITimerProps> {
    componentDidMount() {
        document.addEventListener("keyup", this.props.TimerStore.handleKeyUp);
        document.addEventListener("keydown", this.props.TimerStore.handleKeyDown);

        if (this.props.inspection) {
            this.props.TimerStore.withInspection = true;
        }
    }

    componentWillUnmount() {
        document.removeEventListener("keyup", this.props.TimerStore.handleKeyUp);
        document.removeEventListener("keydown", this.props.TimerStore.handleKeyDown);
    }

    render() {
        const TimerStore = this.props.TimerStore;

        const results = this.props.MainStore.ResultsStore._results;
        const latestResult = results[results.length - 1];

        if (TimerStore.isRunningInspection) {
            return (
                <div className="text-9xl font-vt323">
                    {TimerStore.inspectionTime >= 1 && TimerStore.inspectionTime}
                    {TimerStore.inspectionTime < 1 &&
                        TimerStore.inspectionTime >= -1 &&
                        "+2"}
                    {TimerStore.inspectionTime < -1 && "DNF"}
                </div>
            );
        }

        if (!TimerStore.isRunningTimer) {
            if (results.length === 0) {
                return (
                    <div className="text-9xl font-vt323">
                        <TimeFormatter time={0} />
                    </div>
                );
            } else {
                return (
                    <div className="text-9xl font-vt323">
                        <TimeFormatter
                            time={latestResult.time}
                            penalty={latestResult.penalty}
                            displayTimeOnDnf
                        />
                    </div>
                );
            }
        } else {
            return (
                <div className="text-9xl font-vt323">
                    <TimeFormatter time={TimerStore.elapsedTime} />
                </div>
            );
        }
    }
}

export default observer(Timer);
