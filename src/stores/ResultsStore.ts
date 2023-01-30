import { makeAutoObservable } from "mobx";
import { PenaltyTypes, IResult, IResultNotification } from "../models/IResult";
import MainStore from "./MainStore";

export class ResultsStore {
    MainStore: MainStore;
    _results: IResult[] = [];
    isOpenDeleteModal: boolean = false;
    isOpenResultModal: boolean = false;
    openResults: IResult[] = [];
    resultNotifications: IResultNotification[] = [];

    constructor(mainStore: MainStore) {
        this.MainStore = mainStore;

        makeAutoObservable(this, {});

        this.loadResultsFromLocalStorage();
    }

    public update(key: keyof this, value: any) {
        this[key] = value;
    }

    get filteredResults(): IResult[] {
        return this._results.filter(
            (result) =>
                result.event === this.MainStore.selectedEvent &&
                result.session === this.MainStore.selectedSession
        );
    }

    loadResultsFromLocalStorage = () => {
        const storedResults = localStorage.getItem("results");
        if (storedResults) {
            this._results = JSON.parse(storedResults);
        }
    }

    saveResultsToLocalStorage = () => {
        localStorage.setItem("results", JSON.stringify(this._results));
    }

    addResult = (result: IResult) => {
        this._results.push(result);
        this.saveResultsToLocalStorage();
        this.MainStore.ScrambleStore.getNewScramble();
    };

    addPenalty = (result: IResult, penalty: PenaltyTypes) => {
        if (result.penalty !== "+2" && penalty === "+2") {
            result.time += 2;
        }
        if (result.penalty === "+2" && penalty !== "+2") {
            result.time -= 2;
        }
        result.penalty = penalty;
        this.saveResultsToLocalStorage();
    };

    addComment = (result: IResult, comment: string) => {
        result.comment = comment;
        this.saveResultsToLocalStorage();
    };

    removeResult = (result: IResult) => {
        this._results.splice(this._results.indexOf(result));
        this.saveResultsToLocalStorage();
    };

    deleteAllResultsFromSession = () => {
        this._results = this._results.filter(
            (result) =>
                result.session !== this.MainStore.selectedSession ||
                result.event !== this.MainStore.selectedEvent
        );
        this.saveResultsToLocalStorage();
        this.isOpenDeleteModal = false;
    };

    calculateAvg = (array: IResult[]): number | string => {
        const dnfResults: IResult[] = array.filter((r) => r.penalty === "dnf");
        if (dnfResults.length > 1) {
            return "DNF";
        }
        let worst: number;
        if (dnfResults.length > 0) {
            worst = dnfResults[0].time;
        } else {
            worst = Math.max(...array.map((r) => r.time));
        }
        let best: number;
        if (dnfResults.length > 0) {
            best = Math.min(
                ...array.filter((r) => r.penalty !== "dnf").map((r) => r.time)
            );
        } else {
            best = Math.min(...array.map((r) => r.time));
        }
        const avg: number =
            (array.reduce((a, b) => a + b.time, 0) - (best + worst)) /
            (array.length - 2);
        return avg;
    };

    openDetails = (results: IResult[]) => {
        this.isOpenResultModal = true;
        this.openResults = results;
    };

    closeResultNotification = (notif: IResultNotification) => {

    }
}
