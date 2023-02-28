import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/20/solid";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { IResult } from "../../models/IResult";
import { ResultsStore } from "../../stores/ResultsStore";
import { Button } from "../UI/Button";
import { Icon } from "../UI/Icon";
import Modal from "../UI/Modal";
import { TimeFormatter } from "../utils/TimeFormatter";
import DetailedResultsModal from "./DetailedResultsModal";

export interface IResultsProps {
    ResultsStore?: ResultsStore;
}

class Results extends React.Component<IResultsProps> {
    render() {
        const ResultsStore = this.props.ResultsStore;
        const results = ResultsStore.filteredResults.slice().reverse();
        const stats = ResultsStore.StatisticsStore;

        if (!results) {
            return null;
        }

        return (
            <>
                <Modal
                    header="Confirm delete"
                    footer={
                        <Button
                            color="red"
                            onClick={ResultsStore.deleteAllResultsFromSession}
                        >
                            Delete
                        </Button>
                    }
                    isOpen={ResultsStore.isOpenDeleteModal}
                    onDismiss={() =>
                        ResultsStore.update("isOpenDeleteModal", false)
                    }
                >
                    Are you sure you want to delete all results from the current
                    session?
                </Modal>
                <DetailedResultsModal />
                <div className="flex flex-col">
                    <div className="py-2 text-left font-semibold">
                        <div className="flex flex-row gap-4 justify-between">
                            <div
                                className="flex justify-center items-center px-2 py-1 cursor-pointer rounded-lg hover:bg-slate-100"
                                onClick={() =>
                                    ResultsStore.openDetails(
                                        ResultsStore.filteredResults
                                    )
                                }
                            >
                                {"Solves: "}
                                {stats.validSolveCount}/{stats.solveCount}
                                <br />
                                {"Mean: "}
                                {TimeFormatter({ time: stats.mean })}
                            </div>
                            <div className="flex justify-center items-center">
                                <Button
                                    regular
                                    color="red"
                                    onClick={() =>
                                        ResultsStore.update(
                                            "isOpenDeleteModal",
                                            true
                                        )
                                    }
                                    icon={{ icon: TrashIcon }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-7 gap-2 border-b border-slate-200">
                        <div className="col-span-1 mx-2 my-1 p-1 text-right">
                            #
                        </div>
                        <div className="col-span-2 mx-2 my-1 p-1 text-center">
                            time
                        </div>
                        <div className="col-span-2 mx-2 my-1 p-1 text-center">
                            ao5
                        </div>
                        <div className="col-span-2 mx-2 my-1 p-1 text-center">
                            ao12
                        </div>
                    </div>
                    <div className="flex flex-col h-[28rem] flex-shrink overflow-y-auto scroll-smooth [overflow-anchor:none]">
                        {results.map((result, i) => {
                            let currentFive: IResult[] = results.slice(
                                i,
                                i + 5
                            );
                            let currentTwelve: IResult[] = results.slice(
                                i,
                                i + 12
                            );
                            let avgFive: number | string | null =
                                currentFive.length >= 5
                                    ? ResultsStore.calculateAvg(currentFive)
                                    : null;
                            let avgTwelve: number | string | null =
                                currentTwelve.length >= 12
                                    ? ResultsStore.calculateAvg(currentTwelve)
                                    : null;
                            return (
                                <div
                                    className="grid grid-cols-7 gap-2 border-b border-slate-200"
                                    key={i}
                                >
                                    <div className="col-span-1 mx-2 my-1 p-1 text-right">
                                        {results.length - i}
                                    </div>
                                    <div
                                        className="col-span-2 flex gap-1 mx-2 my-1 p-1 justify-center text-center cursor-pointer rounded-3xl hover:bg-slate-100"
                                        onClick={() =>
                                            ResultsStore.openDetails([result])
                                        }
                                        title={result.comment && result.comment}
                                    >
                                        {result.comment && (
                                            <div className="w-3" />
                                        )}
                                        {TimeFormatter({
                                            time: result.time,
                                            penalty: result.penalty,
                                        })}
                                        {result.comment && (
                                            <Icon
                                                icon={ChatBubbleLeftIcon}
                                                size="xs"
                                            />
                                        )}
                                    </div>
                                    <div
                                        className={`col-span-2 mx-2 my-1 p-1 text-center ${
                                            avgFive &&
                                            `cursor-pointer rounded-3xl hover:bg-slate-100`
                                        }`}
                                        onClick={() =>
                                            ResultsStore.openDetails(
                                                currentFive
                                            )
                                        }
                                    >
                                        {TimeFormatter({ time: avgFive })}
                                    </div>
                                    <div
                                        className={`col-span-2 mx-2 my-1 p-1 text-center ${
                                            avgTwelve &&
                                            `cursor-pointer rounded-3xl hover:bg-slate-100`
                                        }`}
                                        onClick={() =>
                                            ResultsStore.openDetails(
                                                currentTwelve
                                            )
                                        }
                                    >
                                        {TimeFormatter({ time: avgTwelve })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </>
        );
    }
}

export default inject("ResultsStore")(observer(Results));
