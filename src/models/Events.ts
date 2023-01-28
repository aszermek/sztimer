export type EventTypes = "222" | "333" | "444" | "555" | "666" | "777" | "minx" | "pyram" | "sq1" | "clock" | "skewb";
export type EventTypesForViewer = "2x2x2" | "3x3x3" | "4x4x4" | "5x5x5" | "6x6x6" | "7x7x7" | "megaminx" | "pyraminx" | "square1" | "clock" | "skewb";

export interface IEvent {
    key: EventTypes;
    keyForViewer: EventTypesForViewer;
    label: string;
    icon?: any;
}

export const Events: IEvent[] = [
    { key: "222", keyForViewer: "2x2x2", label: "2x2x2" },
    { key: "333", keyForViewer: "3x3x3", label: "3x3x3" },
    { key: "444", keyForViewer: "4x4x4", label: "4x4x4" },
    { key: "555", keyForViewer: "5x5x5", label: "5x5x5" },
    { key: "666", keyForViewer: "6x6x6", label: "6x6x6" },
    { key: "777", keyForViewer: "7x7x7", label: "7x7x7" },
    { key: "minx", keyForViewer: "megaminx", label: "Megaminx" },
    { key: "pyram", keyForViewer: "pyraminx", label: "Pyraminx" },
    { key: "sq1", keyForViewer: "square1", label: "Square-1" },
    { key: "clock", keyForViewer: "clock", label: "Clock" },
    { key: "skewb", keyForViewer: "skewb", label: "Skewb" },
];