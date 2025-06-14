import { statisticsAtom } from "@/atoms/statisticsAtoms";
import { TimeFormatter } from "@/utils/TimeFormatter";
import { ChatCenteredTextIcon, TrashIcon } from "@phosphor-icons/react";
import { useAtom, useAtomValue } from "jotai";
import * as React from "react";
import {
    calculateAvg,
    filteredResultsAtom,
    isOpenDeleteModalAtom,
    openDetailsAtom,
} from "../../atoms/resultAtoms";
import type { Result } from "../../types/results";
import { Button } from "../ui/button";
import { DeleteAllResultsDialog } from "./DeleteAllResultsDialog";
import { DetailedResultsDialog } from "./DetailedResultsDialog";

export const Results: React.FC = () => {
    const filteredResults = useAtomValue(filteredResultsAtom);
    const [, openDetails] = useAtom(openDetailsAtom);
    const stats = useAtomValue(statisticsAtom);
    const [, setIsOpenDeleteModal] = useAtom(isOpenDeleteModalAtom);

    const results = [...filteredResults].reverse();

    if (!results) {
        return null;
    }

    const handleStatsClick = () => {
        openDetails(filteredResults);
    };

    const handleResultClick = (result: Result) => {
        openDetails([result]);
    };

    const handleAvgClick = (avgResults: Result[]) => {
        if (avgResults.length >= 5) {
            openDetails(avgResults);
        }
    };

    return (
        <>
            <DeleteAllResultsDialog />
            <DetailedResultsDialog />

            <div className="flex flex-col">
                <div className="py-2 text-left font-semibold">
                    <div className="flex flex-row gap-4 justify-between">
                        <div
                            className="flex justify-center items-center px-2 py-1 cursor-pointer rounded-lg hover:bg-slate-100"
                            onClick={handleStatsClick}
                        >
                            {"Solves: "}
                            {stats.validSolveCount}/{stats.solveCount}
                            <br />
                            {"Mean: "}
                            {TimeFormatter({ time: stats.mean })}
                        </div>
                        <div className="flex justify-center items-center">
                            <Button
                                size="icon"
                                variant="destructive"
                                onClick={() => setIsOpenDeleteModal(true)}
                            >
                                <TrashIcon size={16} />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-7 gap-2 border-b border-slate-200">
                    <div className="col-span-1 mx-2 my-1 p-1 text-right">#</div>
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
                        const currentFive: Result[] = results.slice(i, i + 5);
                        const currentTwelve: Result[] = results.slice(
                            i,
                            i + 12
                        );
                        const avgFive: number | string | null =
                            currentFive.length >= 5
                                ? calculateAvg(currentFive)
                                : null;
                        const avgTwelve: number | string | null =
                            currentTwelve.length >= 12
                                ? calculateAvg(currentTwelve)
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
                                    onClick={() => handleResultClick(result)}
                                    title={result.comment && result.comment}
                                >
                                    {result.comment && <div className="w-3" />}
                                    {TimeFormatter({
                                        time: result.time,
                                        penalty: result.penalty,
                                    })}
                                    {result.comment && (
                                        <ChatCenteredTextIcon size={16} />
                                    )}
                                </div>
                                <div
                                    className={`col-span-2 mx-2 my-1 p-1 text-center ${
                                        avgFive &&
                                        `cursor-pointer rounded-3xl hover:bg-slate-100`
                                    }`}
                                    onClick={() => handleAvgClick(currentFive)}
                                >
                                    {TimeFormatter({ time: avgFive })}
                                </div>
                                <div
                                    className={`col-span-2 mx-2 my-1 p-1 text-center ${
                                        avgTwelve &&
                                        `cursor-pointer rounded-3xl hover:bg-slate-100`
                                    }`}
                                    onClick={() =>
                                        handleAvgClick(currentTwelve)
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
};
