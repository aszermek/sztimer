import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { makeAutoObservable, makeObservable } from "mobx";
import { inject, observer } from "mobx-react";
import * as React from "react";
import MainStore from "../../stores/MainStore";
import { ResultsStore } from "../../stores/ResultsStore";
import { ScrambleStore } from "../../stores/ScrambleStore";
import { SmallButton } from "../UI/SmallButton";

export interface IScrambleProps {
    MainStore?: MainStore;
    ScrambleStore?: ScrambleStore;
    event: any;
}

class Scramble extends React.Component<IScrambleProps> {
    componentDidMount() {
        this.props.ScrambleStore.scrambleGenerator();
    }

    render() {
        return (
            <div className="text-3xl text-center flex flex-row gap-8">
                {this.props.ScrambleStore.canGetPrevScramble && <SmallButton
                    onClick={() => this.props.ScrambleStore.goToPrevScramble()}
                >
                    <ChevronLeftIcon />
                </SmallButton>}
                <div
                    className="cursor-pointer"
                    onClick={() =>
                        this.props.ScrambleStore.scrambleToClipboard()
                    }
                >
                    {this.props.ScrambleStore.scramble}
                </div>
                <SmallButton
                    onClick={() => this.props.ScrambleStore.goToNextScramble()}
                >
                    <ChevronRightIcon />
                </SmallButton>
            </div>
        );
    }
}

export default (observer(Scramble));
