import React from "react";
import Logo from "./components/UI/Logo";
// import "./App.css";
import EventDropdown from "./components/EventDropdown";
import ResultNotifications from "./components/results/ResultNotifications";
import Results from "./components/results/Results";
import Scramble from "./components/scramble/Scramble";
import Settings from "./components/settings/Settings";
import Timer from "./components/timer/Timer";
import Card from "./components/UI/Card";
import MainStore from "./stores/MainStore";
import { Provider } from "mobx-react";
import Chart from "./components/results/Chart";

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
                <Provider
                    MainStore={MainStore}
                    ScrambleStore={MainStore.ScrambleStore}
                    ResultsStore={MainStore.ResultsStore}
                    StatisticsStore={MainStore.ResultsStore.StatisticsStore}
                >
                    <div className="grid grid-cols-12 bg-slate-200 h-screen">
                        <Card className="h-full flex flex-col gap-4 overflow-hidden">
                            <div
                                id="viewer"
                                className="flex w-full justify-center"
                            />
                            <Settings />
                            <Chart />
                        </Card>
                        <div className="col-span-6 overflow-hidden px-8">
                            <div className="flex flex-col gap-8 items-center pt-8">
                                <Logo />
                                <Scramble event={MainStore.selectedEvent} />
                                <div className="fixed z-20 inset-y-0 w-1/2 flex flex-col gap-4 items-center justify-center">
                                    <Timer />
                                </div>
                            </div>
                        </div>
                        <Card className="h-full flex flex-col gap-4 overflow-hidden">
                            <EventDropdown />
                            <Results />
                            <div className="flex flex-col flex-grow justify-end">
                                <ResultNotifications
                                    ResultsStore={MainStore.ResultsStore}
                                />
                            </div>
                        </Card>
                    </div>
                </Provider>
            </>
        );
    }
}

export default App;
