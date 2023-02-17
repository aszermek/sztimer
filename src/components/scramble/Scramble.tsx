import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { inject, observer } from "mobx-react";
import * as React from "react";
import MainStore from "../../stores/MainStore";
import { ScrambleStore } from "../../stores/ScrambleStore";
import { Button } from "../UI/Button";

export interface IScrambleProps {
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
                    <Button
                        regular
                        onClick={() => ScrambleStore.goToPrevScramble()}
                        icon={{ icon: ChevronLeftIcon }}
                    />
                )}
                <div
                    className="cursor-pointer shrink-1"
                    onClick={() => ScrambleStore.scrambleToClipboard()}
                >
                    {ScrambleStore.isLoading ? "..." : ScrambleStore.scramble}
                </div>
                <Button
                    regular
                    onClick={() => ScrambleStore.goToNextScramble()}
                    icon={{ icon: ChevronRightIcon }}
                />
            </div>
        );
    }
}

export default inject('ScrambleStore')(observer(Scramble));
