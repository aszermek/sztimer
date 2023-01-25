import { makeAutoObservable, makeObservable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { ResultsStore } from "../../stores/ResultsStore";
import { SmallButton } from "../UI/SmallButton";
import { CheckIcon } from '@heroicons/react/24/solid'
import { XMarkIcon } from '@heroicons/react/24/solid'
import MainStore from "../../stores/MainStore";

export interface IResultFlaggerProps {
    MainStore?: MainStore;
    ResultsStore?: ResultsStore;
}

class ResultFlagger extends React.Component<IResultFlaggerProps> {
	ResultsStore: ResultsStore;

    render() {
        const ResultsStore = this.props.ResultsStore;
        const results = ResultsStore._results;

        if (!results.length) return null;

        const latestResult = results[results.length - 1];

        return (
            <div className="flex flex-row gap-3">
                <SmallButton onClick={() => ResultsStore.addPenalty(latestResult, null)}><CheckIcon /></SmallButton>
                <SmallButton onClick={() => ResultsStore.addPenalty(latestResult, '+2')}>+2</SmallButton>
                <SmallButton onClick={() => ResultsStore.addPenalty(latestResult, 'dnf')}>DNF</SmallButton>
                <SmallButton onClick={() => ResultsStore.removeResult(latestResult)}><XMarkIcon /></SmallButton>
            </div>
        );
    }
}

export default observer(ResultFlagger);