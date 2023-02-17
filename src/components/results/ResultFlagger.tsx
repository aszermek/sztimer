import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { IResult } from "../../models/IResult";
import MainStore from "../../stores/MainStore";
import { ResultsStore } from "../../stores/ResultsStore";
import { Button } from "../UI/Button";

export interface IResultFlaggerProps {
    ResultsStore?: ResultsStore;
    result: IResult;
}

class ResultFlagger extends React.Component<IResultFlaggerProps> {
    render() {
        const { ResultsStore, result } = this.props;

        if (!result) return null;

        return (
            <div className="flex flex-row gap-3">
                <Button
                    regular
                    onClick={() => ResultsStore.addPenalty(result, null)}
                    icon={{ icon: CheckIcon }}
                />
                <Button
                    regular
                    onClick={() => ResultsStore.addPenalty(result, "+2")}
                >
                    +2
                </Button>
                <Button
                    regular
                    onClick={() => ResultsStore.addPenalty(result, "dnf")}
                >
                    DNF
                </Button>
                <Button
                    regular
                    onClick={() => ResultsStore.removeResult(result)}
                    icon={{ icon: XMarkIcon }}
                />
            </div>
        );
    }
}

export default inject('ResultsStore')(observer(ResultFlagger));
