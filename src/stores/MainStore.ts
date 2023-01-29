import { action, makeAutoObservable } from "mobx";
import { EventTypes } from "../models/Events";
import { ResultsStore } from "./ResultsStore";
import { ScrambleStore } from "./ScrambleStore";
import { TimerStore } from "./TimerStore";

export default class MainStore {
    ResultsStore: ResultsStore;
    ScrambleStore: ScrambleStore;
    TimerStore: TimerStore;
    selectedEvent: EventTypes = "333";
    selectedSession: string = "Regular";
    isOpenAnyModal: boolean = false;

    constructor() {
        this.ResultsStore = new ResultsStore(this);
        this.ScrambleStore = new ScrambleStore(this);
        this.TimerStore = new TimerStore(this);

        makeAutoObservable(this, {});
    }

    public update(key: keyof this, value: any) {
        this[key] = value;
    }
}