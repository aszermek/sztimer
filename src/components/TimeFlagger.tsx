import { makeObservable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { ResultsStore } from "../stores/ResultsStore";

export interface ITimeFlaggerProps {
    resultsStore: ResultsStore;
}

class TimeFlagger extends React.Component<ITimeFlaggerProps> {
	ResultsStore: ResultsStore;

    constructor(props: ITimeFlaggerProps) {
        super(props);
        makeObservable(this, {});

		this.ResultsStore = new ResultsStore();
    }

    render() {
        const results = this.props.resultsStore._results;

        if (!results.length) return null;

        const latestResult = results[results.length - 1];

        return (
            <div className="flex flex-row gap-3">
                <div className="text-xl cursor-pointer" onClick={() => this.ResultsStore.addPenalty(latestResult, null)}>OK</div>
                <div className="text-xl cursor-pointer" onClick={() => this.ResultsStore.addPenalty(latestResult, '+2')}>+2</div>
                <div className="text-xl cursor-pointer" onClick={() => this.ResultsStore.addPenalty(latestResult, 'dnf')}>DNF</div>
                <div className="text-xl cursor-pointer" onClick={() => this.props.resultsStore.removeResult(latestResult)}>X</div>
            </div>
        );
    }
}

export default observer(TimeFlagger);