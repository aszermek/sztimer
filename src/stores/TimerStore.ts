import { makeAutoObservable, runInAction } from "mobx";
import { IPenaltyTypes, IResult } from "../models/IResult";
import MainStore from "./MainStore";

export class TimerStore {
    MainStore: MainStore;
    withInspection: boolean = false;
    isRunningTimer: boolean = false;
    isRunningInspection: boolean = false;
    isSpacebarPressed: boolean = false;
    justStopped: boolean = false;
    canRestart: boolean = true;
    elapsedTime: number = 0;
    inspectionTime: number = 15;
    timerIntervalId: number | undefined;
    inspectionIntervalId: number | undefined;
    cachedInspectionPenalty: IPenaltyTypes = null;

    constructor(mainStore: MainStore) {
        this.MainStore = mainStore;

        makeAutoObservable(this, {});
    }

    public update(key: keyof this, value: any) {
        this[key] = value;
    }

    handleKeyUp = (event: KeyboardEvent) => {
        if (!this.MainStore.isOpenAnyModal) {
            this.update("isSpacebarPressed", false);
            if (event.key === " ") {
                if (
                    !this.justStopped &&
                    !this.isRunningTimer &&
                    this.canRestart
                ) {
                    if (this.withInspection && !this.isRunningInspection) {
                        this.startCountdown();
                    } else {
                        this.startTimer();
                    }
                } else {
                    this.update("justStopped", false);
                }
            }
        }
    };

    handleKeyDown = (event: KeyboardEvent) => {
        if (!this.MainStore.isOpenAnyModal) {
            this.update("isSpacebarPressed", true);
            if (this.isRunningTimer) {
                this.stopTimer();
                if (event.key === " ") {
                    this.update("justStopped", true);
                }
                if (event.key === "Escape") {
                    const results = this.MainStore.ResultsStore.filteredResults;
                    const latestResult = results[results.length - 1];
                    this.MainStore.ResultsStore.addPenalty(latestResult, "dnf");
                }
            }
        }
    };

    startTimer = () => {
        clearInterval(this.inspectionIntervalId);
        this.isRunningInspection = false;
        this.inspectionTime = 15;

        this.isRunningTimer = true;
        this.elapsedTime = 0;
        this.timerIntervalId = window.setInterval(() => {
            runInAction(() => {
                this.elapsedTime += 0.01;
            });
        }, 10);
    };

    startCountdown = () => {
        this.isRunningInspection = true;
        this.inspectionIntervalId = window.setInterval(() => {
            runInAction(() => {
                this.inspectionTime -= 1;
            });
            if (this.inspectionTime < 1) {
                this.inspectionPenaltyHandler(this.inspectionTime);
            }
        }, 1000);
    };

    inspectionPenaltyHandler = (usedInspection: number) => {
        if (usedInspection < -1) {
            this.cachedInspectionPenalty = "dnf";
        } else if (usedInspection < 1 && usedInspection >= -1) {
            this.cachedInspectionPenalty = "+2";
        }
    };

    stopTimer = () => {
        clearInterval(this.timerIntervalId);
        this.isRunningTimer = false;
        this.canRestart = false;
        setTimeout(() => {
            this.canRestart = true;
        }, 200);

        this.MainStore.ResultsStore.addResult({
            time: this.elapsedTime,
            scramble: this.MainStore.ScrambleStore.scramble,
            date: new Date(),
            event: this.MainStore.selectedEvent,
            session: this.MainStore.selectedSession
        } as IResult);

        const results = this.MainStore.ResultsStore.filteredResults;
        const latestResult = results[results.length - 1];
        if (this.cachedInspectionPenalty) {
            this.MainStore.ResultsStore.addPenalty(
                latestResult,
                this.cachedInspectionPenalty
            );
        }

        this.cachedInspectionPenalty = null;
    };
}
