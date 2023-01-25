import { ResultsStore } from "./ResultsStore";
import { ScrambleStore } from "./ScrambleStore";
import { TimerStore } from "./TimerStore";

export default class MainStore {
    ResultsStore: ResultsStore;
    ScrambleStore: ScrambleStore;
    TimerStore: TimerStore;
    selectedEvent: string = "333";

    constructor() {
        this.ResultsStore = new ResultsStore(this);
        this.ScrambleStore = new ScrambleStore(this);
        this.TimerStore = new TimerStore(this);
    }
}