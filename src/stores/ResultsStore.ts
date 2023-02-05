import { makeAutoObservable } from "mobx";
import { IResult, IResultNotification, PenaltyTypes } from "../models/IResult";
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
        const filteredResults = this._results.filter(
            (result) =>
                result.event === this.MainStore.selectedEvent &&
                result.session === this.MainStore.selectedSession
        );

        return filteredResults;
    }

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

    getAverages = (length: number): number[] => {
        let averages: number[] = [];
        const results = this.filteredResults;
        if (results.length >= length - 1) {
            results.map((result, index) => {
                let current: IResult[] = results.slice(
                    index - length + 1,
                    index + 1
                );
                if (index >= length - 1) {
                    let avg = this.calculateAvg(current);
                    if (typeof avg === "number") averages.push(avg);
                }
            });
        }
        return averages;
    };

    get ao5s(): number[] {
        return this.getAverages(5);
    }

    get ao12s(): number[] {
        return this.getAverages(12);
    }

    get ao50s(): number[] {
        return this.getAverages(50);
    }

    get ao100s(): number[] {
        return this.getAverages(100);
    }

    loadResultsFromLocalStorage = () => {
        const storedResults = localStorage.getItem("results");
        if (storedResults) {
            this._results = JSON.parse(storedResults);
        }
    };

    saveResultsToLocalStorage = () => {
        localStorage.setItem("results", JSON.stringify(this._results));
    };

    addResult = (result: IResult) => {
        this._results.push(result);
        this.saveResultsToLocalStorage();
        this.checkForPB();
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
        this.resultNotifications = [];
        this.saveResultsToLocalStorage();
        this.isOpenDeleteModal = false;
    };

    openDetails = (results: IResult[]) => {
        this.isOpenResultModal = true;
        this.openResults = results;
    };

    checkForPB = () => {
        const results = this.filteredResults;
        const latestResult =
            this.filteredResults[this.filteredResults.length - 1];
        const eventAndSession = {
            event: this.MainStore.selectedEvent,
            session: this.MainStore.selectedSession,
        };

        if (
            latestResult.penalty !== "dnf" &&
            latestResult.time === Math.min(...results.map((r) => r.time))
        ) {
            this.addNotification({
                type: "single",
                ...eventAndSession,
            });
        }

        if (results.length >= 5) {
            const latestAo5 = this.calculateAvg(results.slice(-5));
            if (
                typeof latestAo5 === "number" &&
                latestAo5 === Math.min(...this.ao5s)
            ) {
                this.addNotification({
                    type: "ao5",
                    ...eventAndSession,
                });
            }
        }

        if (results.length >= 12) {
            const latestAo12 = this.calculateAvg(results.slice(-12));
            if (
                typeof latestAo12 === "number" &&
                latestAo12 === Math.min(...this.ao12s)
            ) {
                this.addNotification({
                    type: "ao12",
                    ...eventAndSession,
                });
            }
        }

        if (results.length >= 50) {
            const latestAo50 = this.calculateAvg(results.slice(-50));
            if (
                typeof latestAo50 === "number" &&
                latestAo50 === Math.min(...this.ao50s)
            ) {
                this.addNotification({
                    type: "ao50",
                    ...eventAndSession,
                });
            }
        }

        if (results.length >= 100) {
            const latestAo100 = this.calculateAvg(results.slice(-100));
            if (
                typeof latestAo100 === "number" &&
                latestAo100 === Math.min(...this.ao100s)
            ) {
                this.addNotification({
                    type: "ao100",
                    ...eventAndSession,
                });
            }
        }
    };

    addNotification = (notif: IResultNotification) => {
        this.resultNotifications.push(notif);
    };

    closeResultNotification = (notif: IResultNotification) => {
        this.resultNotifications.splice(
            this.resultNotifications.indexOf(notif),
            1
        );
        console.log("close", notif);
    };

    closeAllResultNotifications = () => {
        this.resultNotifications = [];
    };
}
