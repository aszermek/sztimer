import { inject, observer, Provider } from "mobx-react";
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

        const results = MainStore.ResultsStore.filteredResults;
        const latestResult = results[results.length - 1];

        return (
            <>
                <Provider
                    TimerStore={MainStore.TimerStore}
                    ResultsStore={MainStore.ResultsStore}
                >
                    {MainStore.TimerStore.isManualEnter ? (
                        <ManualTimer />
                    ) : (
                        <SpacebarTimer />
                    )}
                    <div className="mt-2">
                        <ResultFlagger result={latestResult} />
                    </div>
                </Provider>
            </>
        );
    }
}

export default inject("MainStore")(observer(Timer));
