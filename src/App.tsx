import React from "react";
import Logo from "./components/UI/Logo";
// import "./App.css";
import Results from "./components/results/Results";
import Scramble from "./components/scramble/Scramble";
import TimeFlagger from "./components/timer/TimeFlagger";
import Timer from "./components/timer/Timer";
import { ResultsStore } from "./stores/ResultsStore";
import { Card } from "./components/UI/Card";
import Modal from "./components/UI/Modal";
import { Button } from "./components/UI/Button";

class App extends React.Component {
    ResultsStore: ResultsStore;
    constructor(props: any) {
        super(props);

        this.ResultsStore = new ResultsStore();
    }

    render() {
        return (
            <>
                <div className="grid grid-cols-6 bg-slate-200 h-screen">
                    <Card></Card>
                    <div className="col-span-4 overflow-hidden">
                        <div className="flex flex-col gap-8 items-center pt-8">
                            <Logo />
                            <Scramble
                                resultsStore={this.ResultsStore}
                                event={this.ResultsStore.selectedEvent}
                            />
                            <div className="h-[35vw] flex flex-col gap-4 items-center justify-center">
                                <Timer
                                    resultsStore={this.ResultsStore}
                                    inspection
                                />
                                <TimeFlagger resultsStore={this.ResultsStore} />
                            </div>
                        </div>
                    </div>
                    <Card>
                        <Results results={this.ResultsStore._results} />
                    </Card>
                </div>
            </>
        );
    }
}

export default App;
