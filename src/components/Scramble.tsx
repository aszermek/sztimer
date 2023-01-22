import { flow, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import ScrambleService from "../services/ScrambleService";

export interface IScrambleProps {
    event: any;
}

class Scramble extends React.Component<IScrambleProps> {
    scramble: string = "";
    constructor(props: IScrambleProps) {
        super(props);
        makeObservable(this, {
            scramble: observable,
            generateScramble: flow,
        });
    }

    componentDidMount() {
        this.generateScramble();
    }

    public update(key: keyof this, value: any) {
        this[key] = value;
    }

    *generateScramble() {
        this.scramble = yield ScrambleService.getScramble(this.props.event);
    }

    render() {
        return <div className="text-3xl">{this.scramble}</div>;
    }
}

export default observer(Scramble);
