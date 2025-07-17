import {
    ChatCenteredTextIcon,
    CheckIcon,
    PaperPlaneRightIcon,
    TrashIcon,
    XIcon,
} from "@phosphor-icons/react";
import { useAtom } from "jotai";
import * as React from "react";
import { useEffect, useState } from "react";
import {
    addCommentAtom,
    addPenaltyAtom,
    filteredResultsAtom,
    isOpenCommentInputAtom,
    removeResultAtom,
} from "../../atoms/resultAtoms";
import type { Result } from "../../types/results";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export interface IResultFlaggerProps {
    result?: Result;
}

export const ResultFlagger: React.FC<IResultFlaggerProps> = ({ result }) => {
    const [, addPenalty] = useAtom(addPenaltyAtom);
    const [, addComment] = useAtom(addCommentAtom);
    const [, removeResult] = useAtom(removeResultAtom);

    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const [comment, setComment] = useState(result?.comment || "");

    useEffect(() => {
        setComment(result?.comment || "");
    }, [result]);

    const handleCommentToggle = () => {
        setIsCommentOpen(!isCommentOpen);
    };

    const handleCommentSubmit = () => {
        if (result) addComment({ result, comment: comment.trim() });
        setIsCommentOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Escape") {
            setIsCommentOpen(false);
        } else if (e.key === "Enter") {
            e.preventDefault();
            handleCommentSubmit();
        }
    };

    const handlePenaltyChange = (penalty: "dnf" | "+2" | null) => {
        if (result) addPenalty({ result, penalty });
    };

    const handleRemoveResult = () => {
        if (result) removeResult(result);
    };

    if (!result) return null;

    const commonButtonProps: Partial<React.ComponentProps<typeof Button>> = {
        variant: "outline",
        size: "icon",
    };

    if (isCommentOpen) {
        return (
            <div className="flex gap-2 items-center w-full max-w-sm">
                <Input
                    autoFocus
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add a comment..."
                    className="min-w-35 flex-1"
                />
                <Button {...commonButtonProps} onClick={handleCommentSubmit}>
                    <PaperPlaneRightIcon size={16} />
                </Button>
                <Button
                    {...commonButtonProps}
                    onClick={() => setIsCommentOpen(false)}
                >
                    <XIcon size={16} />
                </Button>
            </div>
        );
    }

    return (
        <div className="flex gap-3">
            <Button
                {...commonButtonProps}
                onClick={handleCommentToggle}
                className={result.comment ? "border-blue-500" : undefined}
            >
                <ChatCenteredTextIcon size={16} />
            </Button>
            <Button
                {...commonButtonProps}
                onClick={() => handlePenaltyChange(null)}
                className={
                    result.penalty === null ? "border-green-500" : undefined
                }
            >
                <CheckIcon size={16} />
            </Button>
            <Button
                {...commonButtonProps}
                onClick={() => handlePenaltyChange("+2")}
                className={
                    result.penalty === "+2" ? "border-yellow-500" : undefined
                }
            >
                +2
            </Button>
            <Button
                {...commonButtonProps}
                onClick={() => handlePenaltyChange("dnf")}
                className={
                    result.penalty === "dnf" ? "border-red-500" : undefined
                }
            >
                DNF
            </Button>
            <Button {...commonButtonProps} onClick={handleRemoveResult}>
                <TrashIcon size={16} className="text-red-500" />
            </Button>
        </div>
    );
};
