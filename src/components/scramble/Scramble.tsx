import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { makeObservable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { ResultsStore } from "../../stores/ResultsStore";
import { SmallButton } from "../UI/SmallButton";

export interface IScrambleProps {
    event: any;
    resultsStore: ResultsStore;
}

class Scramble extends React.Component<IScrambleProps> {
    ResultsStore: ResultsStore;

    constructor(props: IScrambleProps) {
        super(props);
        makeObservable(this, {});

        this.ResultsStore = new ResultsStore();
    }

    componentDidMount() {
        this.props.resultsStore.generateScramble(
            this.props.resultsStore.selectedEvent
        );
    }

    render() {
        return (
            <div className="text-3xl text-center flex flex-row gap-8">
                {this.props.resultsStore.canGetPrevScramble && <SmallButton
                    onClick={() => this.props.resultsStore.getPrevScramble()}
                >
                    <ChevronLeftIcon />
                </SmallButton>}
                <div
                    className="cursor-pointer"
                    onClick={() =>
                        this.props.resultsStore.scrambleToClipboard()
                    }
                >
                    {this.props.resultsStore.scramble}
                </div>
                <SmallButton
                    onClick={() => this.props.resultsStore.getNextScramble()}
                >
                    <ChevronRightIcon />
                </SmallButton>
            </div>
        );
    }
}

export default observer(Scramble);
