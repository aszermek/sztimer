import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { observer } from "mobx-react";
import * as React from "react";
import MainStore from "../../stores/MainStore";
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
        const ScrambleStore = this.props.ScrambleStore;

        return (
            <div className="text-3xl text-center flex flex-row gap-8">
                {ScrambleStore.canGetPrevScramble && (
                    <SmallButton
                        onClick={() => ScrambleStore.goToPrevScramble()}
                    >
                        <div className="w-full">
                            <ChevronLeftIcon />
                        </div>
                    </SmallButton>
                )}
                <div
                    className="cursor-pointer shrink-1"
                    onClick={() => ScrambleStore.scrambleToClipboard()}
                >
                    {ScrambleStore.isLoading ? "..." : ScrambleStore.scramble}
                </div>
                <SmallButton onClick={() => ScrambleStore.goToNextScramble()}>
                    <div className="w-full">
                        <ChevronRightIcon />
                    </div>
                </SmallButton>
            </div>
        );
    }
}

export default observer(Scramble);
