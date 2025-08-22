import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { calculateAvg } from "@/lib/calculateAvg";
import { formatTime } from "@/lib/formatTime";
import { ClipboardTextIcon } from "@phosphor-icons/react";
import { useAtom, useAtomValue } from "jotai";
import * as React from "react";
import { useRef, useState } from "react";
import {
    closeDetailsAtom,
    filteredResultsAtom,
    openResultsAtom,
} from "../../atoms/resultAtoms";
import { statisticsAtom } from "../../atoms/statisticsAtoms";
import { Button } from "../ui/button";
import { ResultFlagger } from "./ResultFlagger";

export const DetailedResultsDialog: React.FC = () => {
    const openResults = useAtomValue(openResultsAtom);
    const filteredResults = useAtomValue(filteredResultsAtom);
    const stats = useAtomValue(statisticsAtom);

    const [, closeDetails] = useAtom(closeDetailsAtom);

    const [isCopied, setIsCopied] = useState(false);
    const detailsRef = useRef<HTMLDivElement | null>(null);

    const results = openResults;

    const handleClose = () => {
        closeDetails();
    };

    const handleCopy = async () => {
        if (detailsRef.current) {
            await navigator.clipboard.writeText(detailsRef.current.innerText);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    if (!results.length) return null;

    const validResultsInDialog = results.filter((r) => r.penalty !== "dnf");
    const dnfCountInDialog = results.length - validResultsInDialog.length;
    let worst: number | undefined;
    if (dnfCountInDialog > 0) {
        worst = results.find((r) => r.penalty === "dnf")?.time;
    } else {
        worst = Math.max(...results.map((r) => r.time));
    }
    const best =
        validResultsInDialog.length > 0
            ? Math.min(...validResultsInDialog.map((r) => r.time))
            : undefined;

    return (
        <Dialog open={results.length > 0} onOpenChange={handleClose}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Result details</DialogTitle>
                </DialogHeader>

                <div
                    className="flex flex-col gap-1 max-h-[60vh] overflow-auto"
                    ref={detailsRef}
                >
                    {results.length === filteredResults.length ? (
                        <div className="flex flex-col gap-1 mb-2">
                            <div>
                                Solves: {stats.validSolveCount}/
                                {stats.solveCount}
                            </div>
                            <div>Mean: {formatTime({ time: stats.mean })}</div>
                            <div>
                                Best single:{" "}
                                {formatTime({ time: stats.bestSingle })}
                            </div>
                            <div>
                                Worst single:{" "}
                                {formatTime({ time: stats.worstSingle })}
                            </div>
                            <div>
                                Best average of 5:{" "}
                                {formatTime({ time: stats.bestAo5 })}
                            </div>
                        </div>
                    ) : (
                        results.length > 1 && (
                            <div className="mb-2">
                                Average of {results.length}:{" "}
                                {formatTime({ time: calculateAvg(results) })}
                            </div>
                        )
                    )}
                    {results
                        .slice()
                        .reverse()
                        .map((result, i) => (
                            <div key={i}>
                                {results.length > 1 &&
                                    `${results.length - i}. `}
                                {results.length > 1 &&
                                (result.time === best ||
                                    result.time === worst) ? (
                                    <>
                                        (
                                        {formatTime({
                                            time: result.time,
                                            penalty: result.penalty,
                                            displayTimeOnDnf: true,
                                        })}
                                        )
                                    </>
                                ) : (
                                    formatTime({
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
                                {isCopied ? "Copied!" : "Copy"}
                            </Button>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
