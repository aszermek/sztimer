import React from "react";
import Logo from "./components/Logo";
// import "./App.css";
import Results from "./components/Results";
import Scramble from "./components/Scramble";
import TimeFlagger from "./components/TimeFlagger";
import Timer from "./components/Timer";
import { ResultsStore } from "./stores/ResultsStore";

class App extends React.Component {
    ResultsStore: ResultsStore;
    constructor(props: any) {
        super(props);

        this.ResultsStore = new ResultsStore();
    }

    render() {
        const card: string = "m-6 p-8 bg-white rounded-3xl";
        return (
            <>
                <div className="grid grid-cols-6 bg-slate-200 h-screen">
                    <div className={card}></div>
                    <div className="col-span-4 overflow-hidden">
                        <div className="flex flex-col gap-4 items-center pt-8">
                            <Logo />
                            <Scramble event={this.ResultsStore.selectedEvent} />
                            <div className="h-[35vw] flex flex-col items-center justify-center">
                                <Timer
                                    resultsStore={this.ResultsStore}
                                    inspection
                                />
                                <TimeFlagger resultsStore={this.ResultsStore} />
                            </div>
                        </div>
                    </div>
                    <div className={card}>
                        <Results results={this.ResultsStore._results} />
                    </div>
                </div>
            </>
        );
    }
}

export default App;
