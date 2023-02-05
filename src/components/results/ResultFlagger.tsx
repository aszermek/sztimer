import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { observer } from "mobx-react";
import * as React from "react";
import MainStore from "../../stores/MainStore";
import { ResultsStore } from "../../stores/ResultsStore";
import { Button } from "../UI/Button";

export interface IResultFlaggerProps {
    MainStore?: MainStore;
    ResultsStore?: ResultsStore;
}

class ResultFlagger extends React.Component<IResultFlaggerProps> {
    render() {
        const ResultsStore = this.props.ResultsStore;
        const results = ResultsStore.filteredResults;

        if (!results.length) return null;

        const latestResult = results[results.length - 1];

        return (
            <div className="flex flex-row gap-3">
                <Button
                    regular
                    onClick={() => ResultsStore.addPenalty(latestResult, null)}
                    icon={{ icon: CheckIcon }}
                />
                <Button
                    regular
                    onClick={() => ResultsStore.addPenalty(latestResult, "+2")}
                >
                    +2
                </Button>
                <Button
                    regular
                    onClick={() => ResultsStore.addPenalty(latestResult, "dnf")}
                >
                    DNF
                </Button>
                <Button
                    regular
                    onClick={() => ResultsStore.removeResult(latestResult)}
                    icon={{ icon: XMarkIcon }}
                />
            </div>
        );
    }
}

export default observer(ResultFlagger);
