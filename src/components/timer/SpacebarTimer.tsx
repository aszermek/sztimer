import { inject, observer } from "mobx-react";
import * as React from "react";
import MainStore from "../../stores/MainStore";
import { TimerStore } from "../../stores/TimerStore";
import { TimeFormatter } from "../utils/TimeFormatter";

export interface ISpacebarTimerProps {
    TimerStore?: TimerStore;
}

class SpacebarTimer extends React.Component<ISpacebarTimerProps> {
    componentDidMount() {
        document.addEventListener("keyup", this.props.TimerStore.handleKeyUp);
        document.addEventListener(
            "keydown",
            this.props.TimerStore.handleKeyDown
        );

        // if (this.props.MainStore.ResultsStore.isOpenResultModal) {
        //     document.removeEventListener(
        //         "keyup",
        //         this.props.TimerStore.handleKeyUp
        //     );
        //     document.removeEventListener(
        //         "keydown",
        //         this.props.TimerStore.handleKeyDown
        //     );
        // }
    }

    componentWillUnmount() {
        document.removeEventListener(
            "keyup",
            this.props.TimerStore.handleKeyUp
        );
        document.removeEventListener(
            "keydown",
            this.props.TimerStore.handleKeyDown
        );
    }

    render() {
        const TimerStore = this.props.TimerStore;

        const results = TimerStore.MainStore.ResultsStore.filteredResults;
        const latestResult = results[results.length - 1];

        if (TimerStore.isRunningInspection) {
            // inspection
            return (
                <div
                    className={`text-9xl font-vt323 ${
                        TimerStore.isSpacebarPressed && "text-green-500"
                    }`}
                >
                    {TimerStore.inspectionTime >= 1 &&
                        TimerStore.inspectionTime}
                    {TimerStore.inspectionTime < 1 &&
                        TimerStore.inspectionTime >= -1 &&
                        "+2"}
                    {TimerStore.inspectionTime < -1 && "DNF"}
                </div>
            );
        }

        // timer not running
        if (!TimerStore.isRunningTimer) {
            if (results.length === 0) {
                // no results yet (show 0.00)
                return (
                    <div
                        className={`text-9xl font-vt323 ${
                            TimerStore.isSpacebarPressed && "text-green-500"
                        }`}
                    >
                        {TimeFormatter({ time: 0 })}
                    </div>
                );
            } else {
                // session has results (show latest)
                return (
                    <div
                        className={`text-9xl font-vt323 ${
                            TimerStore.isSpacebarPressed && "text-green-500"
                        }`}
                    >
                        {TimeFormatter({
                            time: latestResult.time,
                            penalty: latestResult.penalty,
                            displayTimeOnDnf: true,
                        })}
                    </div>
                );
            }
        } else {
            // timer running
            return (
                <div className="text-9xl font-vt323">
                    {TimeFormatter({ time: TimerStore.elapsedTime })}
                </div>
            );
        }
    }
}

export default inject("TimerStore")(observer(SpacebarTimer));
