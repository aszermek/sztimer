import { makeObservable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { ResultsStore } from "../../stores/ResultsStore";
import { SmallButton } from "../common/SmallButton";
import { CheckIcon } from '@heroicons/react/24/solid'
import { XMarkIcon } from '@heroicons/react/24/solid'

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
                <SmallButton onClick={() => this.ResultsStore.addPenalty(latestResult, null)}><CheckIcon /></SmallButton>
                <SmallButton onClick={() => this.ResultsStore.addPenalty(latestResult, '+2')}>+2</SmallButton>
                <SmallButton onClick={() => this.ResultsStore.addPenalty(latestResult, 'dnf')}>DNF</SmallButton>
                <SmallButton onClick={() => this.props.resultsStore.removeResult(latestResult)}><XMarkIcon /></SmallButton>
            </div>
        );
    }
}

export default observer(TimeFlagger);