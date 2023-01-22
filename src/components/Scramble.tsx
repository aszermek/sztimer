import { makeObservable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { ResultsStore } from "../stores/ResultsStore";

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
            <div className="text-3xl flex flex-row gap-8">
                <div
                    className={
                        this.props.resultsStore.canGetPrevScramble
                            ? "cursor-pointer"
                            : "pointer-events-none text-slate-300"
                    }
                    onClick={() => this.props.resultsStore.getPrevScramble()}
                >
                    {"<"}
                </div>
                <div
                    className="cursor-pointer"
                    onClick={() =>
                        this.props.resultsStore.scrambleToClipboard()
                    }
                >
                    {this.props.resultsStore.scramble}
                </div>
                <div
                    className="cursor-pointer"
                    onClick={() => this.props.resultsStore.getNextScramble()}
                >
                    {">"}
                </div>
            </div>
        );
    }
}

export default observer(Scramble);
