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
    closeDetailsAtom,
    removeResultAtom,
} from "../../atoms/resultAtoms";
import type { Result } from "../../types/results";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export interface ResultFlaggerProps {
    result?: Result;
}

export const ResultFlagger: React.FC<ResultFlaggerProps> = ({ result }) => {
    const [, addPenalty] = useAtom(addPenaltyAtom);
    const [, addComment] = useAtom(addCommentAtom);
    const [, removeResult] = useAtom(removeResultAtom);
    const [, closeDetails] = useAtom(closeDetailsAtom);

    const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);
    const [comment, setComment] = useState<string>(result?.comment || "");

    useEffect(() => {
        setComment(result?.comment || "");
    }, [result]);

    const handleCommentToggle = () => setIsCommentOpen(!isCommentOpen);

    const handleCommentSubmit = () => {
        if (result) addComment({ result, comment: comment.trim() });
        setIsCommentOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Escape") setIsCommentOpen(false);
        else if (e.key === "Enter") {
            e.preventDefault();
            handleCommentSubmit();
        }
    };

    const handlePenaltyChange = (penalty: "dnf" | "+2" | null) => {
        if (result) addPenalty({ result, penalty });
    };

    const handleRemoveResult = () => {
        if (result) removeResult(result);
        closeDetails();
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
                <Button
                    {...commonButtonProps}
                    onClick={handleCommentSubmit}
                    aria-label="Submit comment"
                >
                    <PaperPlaneRightIcon size={16} />
                </Button>
                <Button
                    {...commonButtonProps}
                    onClick={() => setIsCommentOpen(false)}
                    aria-label="Cancel comment"
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
                onClick={() => handlePenaltyChange(null)}
                className={
                    result.penalty === null ? "border-green-500" : undefined
                }
                aria-label="Mark as OK"
            >
                <CheckIcon size={16} />
            </Button>
            <Button
                {...commonButtonProps}
                onClick={() => handlePenaltyChange("+2")}
                className={
                    result.penalty === "+2" ? "border-yellow-500" : undefined
                }
                aria-label="Mark as +2"
            >
                +2
            </Button>
            <Button
                {...commonButtonProps}
                onClick={() => handlePenaltyChange("dnf")}
                className={
                    result.penalty === "dnf" ? "border-red-500" : undefined
                }
                aria-label="Mark as DNF"
            >
                DNF
            </Button>
            <Button
                {...commonButtonProps}
                onClick={handleCommentToggle}
                className={result.comment ? "border-blue-500" : undefined}
                aria-label="Toggle comment"
            >
                <ChatCenteredTextIcon size={16} />
            </Button>
            <Button
                {...commonButtonProps}
                onClick={handleRemoveResult}
                aria-label="Delete result"
            >
                <TrashIcon size={16} className="text-red-500" />
            </Button>
        </div>
    );
};
