import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useAtom, useAtomValue } from "jotai";
import * as React from "react";
import {
    deleteAllResultsFromSessionAtom,
    filteredResultsAtom,
    isOpenDeleteModalAtom,
} from "../../atoms/resultAtoms";
import { Button } from "../ui/button";

export const DeleteAllResultsDialog: React.FC = () => {
    const filteredResults = useAtomValue(filteredResultsAtom);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useAtom(
        isOpenDeleteModalAtom
    );
    const [, deleteAllResults] = useAtom(deleteAllResultsFromSessionAtom);

    const results = [...filteredResults].reverse();

    if (!results) {
        return null;
    }

    return (
        <Dialog open={isOpenDeleteModal} onOpenChange={setIsOpenDeleteModal}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm delete</DialogTitle>
                </DialogHeader>
                <span>
                    Are you sure you want to delete all results from the current
                    session?
                </span>
                <DialogFooter>
                    <Button variant="destructive" onClick={deleteAllResults}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
