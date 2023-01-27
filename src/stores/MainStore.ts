import { action, makeAutoObservable } from "mobx";
import { ResultsStore } from "./ResultsStore";
import { ScrambleStore } from "./ScrambleStore";
import { TimerStore } from "./TimerStore";

export default class MainStore {
    ResultsStore: ResultsStore;
    ScrambleStore: ScrambleStore;
    TimerStore: TimerStore;
    selectedEvent: string = "333";
    isOpenAnyModal: boolean = false;

    constructor() {
        this.ResultsStore = new ResultsStore(this);
        this.ScrambleStore = new ScrambleStore(this);
        this.TimerStore = new TimerStore(this);

        makeAutoObservable(this, {});
    }

    public update(key: keyof this, value: any) {
        this[key] = value;
        // console.log(this.isOpenAnyModal)
    }
}