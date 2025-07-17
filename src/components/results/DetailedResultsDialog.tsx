import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { TimeFormatter } from "@/utils/TimeFormatter";
import { useAtom, useAtomValue } from "jotai";
import * as React from "react";
import {
    calculateAvg,
    closeDetailsAtom,
    copyDetailsAtom,
    detailsRefAtom,
    filteredResultsAtom,
    isCopiedDetailsAtom,
    isOpenResultModalAtom,
    openResultsAtom,
} from "../../atoms/resultAtoms";
import { statisticsAtom } from "../../atoms/statisticsAtoms";
import type { Result } from "../../types/results";
import { Button } from "../ui/button";
import { ResultFlagger } from "./ResultFlagger";
import { ClipboardTextIcon } from "@phosphor-icons/react";

export const DetailedResultsDialog: React.FC = () => {
    const isOpenResultModal = useAtomValue(isOpenResultModalAtom);
    const openResults = useAtomValue(openResultsAtom);
    const filteredResults = useAtomValue(filteredResultsAtom);
    const stats = useAtomValue(statisticsAtom);
    const isCopiedDetails = useAtomValue(isCopiedDetailsAtom);
    const [, closeDetails] = useAtom(closeDetailsAtom);
    const [, copyDetails] = useAtom(copyDetailsAtom);
    const [, setDetailsRef] = useAtom(detailsRefAtom);

    const results = openResults;

    const handleClose = () => {
        closeDetails();
    };

    const handleCopy = async () => {
        await copyDetails();
    };

    const detailsRefCallback = React.useCallback(
        (node: HTMLDivElement | null) => {
            setDetailsRef(node);
        },
        [setDetailsRef]
    );

    if (!results.length) return null;

    const dnfResults: Result[] = results.filter((r) => r.penalty === "dnf");
    let worst: number;
    if (dnfResults.length > 0) {
        worst = dnfResults[0].time;
    } else {
        worst = Math.max(...results.map((r) => r.time));
    }
    let best: number;
    if (dnfResults.length > 0) {
        best = Math.min(
            ...results.filter((r) => r.penalty !== "dnf").map((r) => r.time)
        );
    } else {
        best = Math.min(...results.map((r) => r.time));
    }

    return (
        <Dialog open={isOpenResultModal} onOpenChange={handleClose}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Result details</DialogTitle>
                </DialogHeader>

                <div
                    className="flex flex-col gap-1 max-h-[60vh] overflow-auto"
                    ref={detailsRefCallback}
                >
                    {results.length === filteredResults.length ? (
                        <div className="flex flex-col gap-1 mb-2">
                            <div>
                                {"Solves: "}
                                {stats.validSolveCount}/{stats.solveCount}
                            </div>
                            <div>
                                {"Mean: "}
                                {TimeFormatter({ time: stats.mean })}
                            </div>
                            <div>
                                {"Best single: "}
                                {TimeFormatter({ time: stats.bestSingle })}
                            </div>
                            <div>
                                {"Worst single: "}
                                {TimeFormatter({ time: stats.worstSingle })}
                            </div>
                            <div>
                                {"Best average of 5: "}
                                {TimeFormatter({ time: stats.bestAo5 })}
                            </div>
                        </div>
                    ) : (
                        results.length > 1 && (
                            <div className="mb-2">
                                Average of {results.length}:{" "}
                                {TimeFormatter({
                                    time: calculateAvg(results),
                                })}
                            </div>
                        )
                    )}
                    {results
                        .slice()
                        .reverse()
                        .map((result, i) => (
                            <div key={i}>
                                {results.length > 1 && i + 1 + ". "}
                                {results.length > 1 &&
                                (result.time === best ||
                                    result.time === worst) ? (
                                    <>
                                        (
                                        {TimeFormatter({
                                            time: result.time,
                                            penalty: result.penalty,
                                            displayTimeOnDnf: true,
                                        })}
                                        )
                                    </>
                                ) : (
                                    TimeFormatter({
                                        time: result.time,
                                        penalty: result.penalty,
                                        displayTimeOnDnf: true,
                                    })
                                )}
                                {" - "}
                                {result.scramble}
                                {" - "}@{result.date.toLocaleString()}{" "}
                                {result.comment && `(${result.comment})`}
                            </div>
                        ))}
                </div>

                <DialogFooter>
                    <div className="flex w-full justify-between items-center gap-4">
                        {results.length === 1 && (
                            <div className="flex">
                                <ResultFlagger result={results[0]} />
                            </div>
                        )}
                        <div className="flex gap-4 w-full justify-end">
                            <Button variant="outline" onClick={handleCopy}>
                                <ClipboardTextIcon />
                                {isCopiedDetails
                                    ? "Copied to clipboard!"
                                    : "Copy to clipboard"}
                            </Button>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
