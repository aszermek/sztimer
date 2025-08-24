import {
    addNewSessionAtom,
    removeSessionAtom,
    selectedEventSessionsAtom,
    selectedSessionAtom,
} from "@/atoms/sessionAtoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React, { useState } from "react";
import { Combobox } from "../common/Combobox";

export const SessionCombobox: React.FC = () => {
    const [searchValue, setSearchValue] = useState("");
    const [selectedSession, setSelectedSession] = useAtom(selectedSessionAtom);
    const sessions = useAtomValue(selectedEventSessionsAtom);
    const addSession = useSetAtom(addNewSessionAtom);
    const removeSession = useSetAtom(removeSessionAtom);

    const options = sessions.map((session) => ({
        value: session,
        label: session,
        isDeletable: session !== "Regular",
    }));

    const handleCreate = (newSession: string) => {
        addSession(newSession);
        setSelectedSession(newSession);
    };

    return (
        <Combobox
            options={options}
            value={selectedSession}
            onChange={setSelectedSession}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            onCreate={handleCreate}
            onDelete={removeSession}
            placeholder="Select session..."
            createLabel="Create session"
            buttonProps={{ size: "xl" }}
            className="w-full"
        />
    );
};
