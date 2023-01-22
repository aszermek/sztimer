import { action, makeObservable, observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { IPenaltyTypes, IResult } from "../models/IResult";
import { ResultsStore } from "../stores/ResultsStore";
import { TimeFormatter } from "./TimeFormatter";

export interface ITimerProps {
    inspection?: boolean;
    resultsStore: ResultsStore;
}

class Timer extends React.Component<ITimerProps> {
    ResultsStore: ResultsStore;
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

    constructor(props: ITimerProps) {
        super(props);
        makeObservable(this, {
            isRunningTimer: observable,
            isRunningInspection: observable,
            isSpacebarPressed: observable,
            justStopped: observable,
            elapsedTime: observable,
            inspectionTime: observable,
            cachedInspectionPenalty: observable,
            startTimer: action,
            startCountdown: action,
            stopTimer: action,
            inspectionPenaltyHandler: action,
            update: action,
        });

        this.ResultsStore = new ResultsStore();
    }

    componentDidMount() {
        document.addEventListener("keyup", this.handleKeyUp);
        document.addEventListener("keydown", this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener("keyup", this.handleKeyUp);
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    public update(key: keyof this, value: any) {
        this[key] = value;
    }

    handleKeyUp = (event: KeyboardEvent) => {
        this.update("isSpacebarPressed", false);
        if (event.key === " ") {
            if (!this.justStopped && !this.isRunningTimer && this.canRestart) {
                if (this.props.inspection && !this.isRunningInspection) {
                    this.startCountdown();
                } else {
                    this.startTimer();
                }
            } else {
                this.update("justStopped", false);
            }
        }
    };

    handleKeyDown = (event: KeyboardEvent) => {
        this.update("isSpacebarPressed", true);
        if (this.isRunningTimer) {
            this.stopTimer();
            if (event.key === " ") {
                this.update("justStopped", true);
            }
            if (event.key === "Escape") {
                const results = this.props.resultsStore._results;
                const latestResult = results[results.length - 1];
                this.props.resultsStore.addPenalty(latestResult, "dnf");
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

        this.props.resultsStore.addResult({
            time: this.elapsedTime,
        } as IResult);

        const results = this.props.resultsStore._results;
        const latestResult = results[results.length - 1];
        if (this.cachedInspectionPenalty) {
            this.props.resultsStore.addPenalty(
                latestResult,
                this.cachedInspectionPenalty
            );
        }

        this.cachedInspectionPenalty = null;
    };

    render() {
        const results = this.props.resultsStore._results;
        const latestResult = results[results.length - 1];

        if (this.isRunningInspection) {
            return (
                <div className="text-9xl font-vt323">
                    {this.inspectionTime >= 1 && this.inspectionTime}
                    {this.inspectionTime < 1 &&
                        this.inspectionTime >= -1 &&
                        "+2"}
                    {this.inspectionTime < -1 && "DNF"}
                </div>
            );
        }

        if (results.length) {
            return (
                <div className="text-9xl font-vt323">
                    {this.isRunningTimer ? (
                        <TimeFormatter time={this.elapsedTime} />
                    ) : (
                        <TimeFormatter
                            time={latestResult.time}
                            penalty={latestResult.penalty}
                            displayTimeOnDnf
                        />
                    )}
                </div>
            );
        }

        return (
            <div className={`text-9xl font-vt323`}>
                <TimeFormatter time={this.elapsedTime} />
            </div>
        );
    }
}

export default observer(Timer);
