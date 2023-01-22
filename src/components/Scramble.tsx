import { flow, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import ScrambleService from "../services/ScrambleService";
import { ResultsStore } from "../stores/ResultsStore";

export interface IScrambleProps {
    event: any;
}

class Scramble extends React.Component<IScrambleProps> {
    ResultsStore: ResultsStore;

    constructor(props: IScrambleProps) {
        super(props);
        makeObservable(this, {});

        this.ResultsStore = new ResultsStore();
    }

    componentDidMount() {
        this.ResultsStore.generateScramble(this.ResultsStore.selectedEvent);
    }

    render() {
        return <div className="text-3xl">{this.ResultsStore.scramble}</div>;
    }
}

export default observer(Scramble);
