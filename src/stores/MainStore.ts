import { action, makeAutoObservable } from "mobx";
import { EventTypes } from "../models/Events";
import { ResultsStore } from "./ResultsStore";
import { ScrambleStore } from "./ScrambleStore";
import { TimerStore } from "./TimerStore";
import { Events } from "../models/Events";

export default class MainStore {
    ResultsStore: ResultsStore;
    ScrambleStore: ScrambleStore;
    TimerStore: TimerStore;
    selectedEvent: EventTypes = "333";
    selectedEventSessions: string[];
    selectedSession: string = "Regular";
    isOpenAnyModal: boolean = false;

    constructor() {
        this.ResultsStore = new ResultsStore(this);
        this.ScrambleStore = new ScrambleStore(this);
        this.TimerStore = new TimerStore(this);

        makeAutoObservable(this, {}); 

        this.load();
    }

    public update(key: keyof this, value: any) {
        this[key] = value;
    }

    load = () => {
        this.selectedEventSessions = Events.find((event) => event.key === this.selectedEvent).sessions;
    }

    addNewSession = (value: string | number) => {
        this.selectedEventSessions.push(value.toString());
        console.log(value)
    };
}
