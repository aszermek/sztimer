import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { observer } from "mobx-react";
import * as React from "react";
import MainStore from "../../stores/MainStore";
import { ScrambleStore } from "../../stores/ScrambleStore";
import { TwistyPlayer } from "cubing/twisty";

export interface IScrambleViewerProps {
    MainStore?: MainStore;
}

class ScrambleViewer extends React.Component<IScrambleViewerProps> {
    constructor(props: IScrambleViewerProps) {
        super(props);
    }
    componentDidMount() {
        
    }

    render() {
        return <div id="viewer" />;
    }
}

export default observer(ScrambleViewer);
