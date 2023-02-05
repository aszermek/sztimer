import React from "react";
import Logo from "./components/UI/Logo";
// import "./App.css";
import EventDropdown from "./components/EventDropdown";
import ResultFlagger from "./components/results/ResultFlagger";
import ResultNotifications from "./components/results/ResultNotifications";
import Results from "./components/results/Results";
import Scramble from "./components/scramble/Scramble";
import Timer from "./components/timer/Timer";
import Card from "./components/UI/Card";
import MainStore from "./stores/MainStore";

class App extends React.Component {
    MainStore: MainStore;
    constructor(props: any) {
        super(props);

        this.MainStore = new MainStore();
    }

    render() {
        const MainStore = this.MainStore;
        return (
            <>
                <div className="grid grid-cols-12 bg-slate-200 h-screen">
                    <Card>
                        <div
                            id="viewer"
                            className="flex w-full justify-center"
                        />
                    </Card>
                    <div className="col-span-6 overflow-hidden px-8">
                        <div className="flex flex-col gap-8 items-center pt-8">
                            <Logo />
                            <Scramble
                                ScrambleStore={MainStore.ScrambleStore}
                                event={MainStore.selectedEvent}
                            />
                            <div className="fixed z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 items-center justify-center">
                                <Timer
                                    MainStore={MainStore}
                                    TimerStore={MainStore.TimerStore}
                                    inspection
                                />
                                <ResultFlagger
                                    ResultsStore={MainStore.ResultsStore}
                                />
                            </div>
                        </div>
                    </div>
                    <Card className="h-full flex flex-col gap-4 overflow-hidden">
                        <EventDropdown MainStore={MainStore} />
                        <Results ResultsStore={MainStore.ResultsStore} />
                        <div className="flex flex-col flex-grow justify-end">
                            <ResultNotifications
                                ResultsStore={MainStore.ResultsStore}
                            />
                        </div>
                    </Card>
                </div>
            </>
        );
    }
}

export default App;
