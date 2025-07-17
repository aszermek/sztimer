import { useAtom } from "jotai";
import { selectedEventAtom } from "@/atoms/sessionAtoms";
import { events, type EventType } from "@/types/events";
import { Combobox } from "@/components/common/Combobox";

export const EventCombobox: React.FC = () => {
    const [selectedEvent, setSelectedEvent] = useAtom(selectedEventAtom);

    const options = events.map((event) => ({
        label: event.label,
        value: event.key,
        icon: event.icon?.icon,
    }));

    return (
        <Combobox
            options={options}
            value={selectedEvent}
            onChange={(val) => setSelectedEvent(val as EventType)}
            placeholder="Select event..."
            buttonProps={{ size: "xl" }}
            className="w-full"
        />
    );
};
