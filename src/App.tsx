import React from "react";
import Logo from "./components/UI/Logo";
// import "./App.css";
import ResultFlagger from "./components/results/ResultFlagger";
import Results from "./components/results/Results";
import Scramble from "./components/scramble/Scramble";
import Timer from "./components/timer/Timer";
import { Card } from "./components/UI/Card";
import MainStore from "./stores/MainStore";

class App extends React.Component {
    MainStore: MainStore;
    constructor(props: any) {
        super(props);

        this.MainStore = new MainStore();
    }

    render() {
        const MainStore = this.MainStore
        return (
            <>
                <div className="grid grid-cols-6 bg-slate-200 h-screen">
                    <Card></Card>
                    <div className="col-span-4 overflow-hidden px-8">
                        <div className="flex flex-col gap-8 items-center pt-8">
                            <Logo />
                            <Scramble
                                ScrambleStore={MainStore.ScrambleStore}
                                event={MainStore.selectedEvent}
                            />
                            <div className="h-[35vw] flex flex-col gap-4 items-center justify-center">
                                <Timer
                                    MainStore={MainStore}
                                    TimerStore={MainStore.TimerStore}
                                    inspection
                                />
                                <ResultFlagger ResultsStore={MainStore.ResultsStore} />
                            </div>
                        </div>
                    </div>
                    <Card>
                        <Results ResultsStore={MainStore.ResultsStore} />
                    </Card>
                </div>
            </>
        );
    }
}

export default App;
