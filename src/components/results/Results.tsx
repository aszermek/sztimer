import { statisticsAtom } from "@/atoms/statisticsAtoms";
import { formatTime } from "@/lib/formatTime";
import { ChatCenteredTextIcon, TrashIcon } from "@phosphor-icons/react";
import { useAtom, useAtomValue } from "jotai";
import * as React from "react";
import { useState } from "react";
import { filteredResultsAtom, openDetailsAtom } from "../../atoms/resultAtoms";
import type { Result } from "../../types/results";
import { Button } from "../ui/button";
import { DeleteAllResultsDialog } from "./DeleteAllResultsDialog";
import { DetailedResultsDialog } from "./DetailedResultsDialog";

export const Results: React.FC = () => {
    const filteredResults = useAtomValue(filteredResultsAtom);
    const [, openDetails] = useAtom(openDetailsAtom);
    const stats = useAtomValue(statisticsAtom);
    const [isOpenDeleteDialog, setIsOpenDeleteDialog] =
        useState<boolean>(false);

    const results = [...filteredResults].reverse();
    const originalLength = filteredResults.length;

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
        if (avgResults.length >= 2) {
            openDetails(avgResults);
        }
    };

    return (
        <>
            <DeleteAllResultsDialog
                open={isOpenDeleteDialog}
                onOpenChange={setIsOpenDeleteDialog}
                onClose={() => setIsOpenDeleteDialog(false)}
            />
            <DetailedResultsDialog />

            <div className="flex flex-col h-full w-full lg:min-h-0 bg-white text-sm border border-border rounded-md p-4">
                <div className="text-left font-semibold">
                    <div className="flex gap-4 items-center justify-between">
                        <div
                            className="flex justify-center items-center cursor-pointer rounded-lg hover:bg-slate-100 p-2"
                            onClick={handleStatsClick}
                        >
                            <div>
                                {"Solves: "}
                                {stats.validSolveCount}/{stats.solveCount}
                                <br />
                                {"Mean: "}
                                {formatTime({ time: stats.mean })}
                            </div>
                        </div>
                        <Button
                            size="icon"
                            variant="destructive"
                            onClick={() => setIsOpenDeleteDialog(true)}
                        >
                            <TrashIcon size={16} />
                        </Button>
                    </div>
                </div>
                <div className="grid grid-cols-7 gap-2 border-b border-slate-200 mt-2">
                    <div className="col-span-1 mx-2 my-1 p-1 text-right text-xs">
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
                <div className="flex flex-col flex-1 overflow-y-auto scroll-smooth [overflow-anchor:none]">
                    {results.map((result, i) => {
                        const originalIndex = originalLength - 1 - i;
                        const resultStats = stats.chartData[originalIndex];

                        return (
                            <div
                                className="grid grid-cols-7 gap-2 border-b border-slate-200"
                                key={i}
                            >
                                <div className="col-span-1 mx-2 my-1 p-1 text-right text-xs self-center">
                                    {originalLength - i}
                                </div>
                                <div
                                    className="col-span-2 flex gap-1 mx-2 my-1 p-1 justify-center text-center cursor-pointer rounded-3xl hover:bg-slate-100 items-center"
                                    onClick={() => handleResultClick(result)}
                                    title={result.comment}
                                >
                                    {result.comment && <div className="w-3" />}
                                    {formatTime({
                                        time: result.time,
                                        penalty: result.penalty,
                                    })}
                                    {result.comment && (
                                        <ChatCenteredTextIcon size={16} />
                                    )}
                                </div>
                                <div
                                    className={`col-span-2 mx-2 my-1 p-1 text-center self-center ${
                                        resultStats?.ao5
                                            ? "cursor-pointer rounded-3xl hover:bg-slate-100"
                                            : "cursor-default"
                                    }`}
                                    onClick={() =>
                                        handleAvgClick(results.slice(i, i + 5))
                                    }
                                >
                                    {formatTime({ time: resultStats?.ao5 })}
                                </div>
                                <div
                                    className={`col-span-2 mx-2 my-1 p-1 text-center self-center ${
                                        resultStats?.ao12
                                            ? "cursor-pointer rounded-3xl hover:bg-slate-100"
                                            : "cursor-default"
                                    }`}
                                    onClick={() =>
                                        handleAvgClick(results.slice(i, i + 12))
                                    }
                                >
                                    {formatTime({ time: resultStats?.ao12 })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};
