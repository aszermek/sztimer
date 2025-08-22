import {
    CircleNotchIcon,
    DiamondIcon,
    NumberSquareFiveIcon,
    NumberSquareFourIcon,
    NumberSquareOneIcon,
    NumberSquareSevenIcon,
    NumberSquareSixIcon,
    NumberSquareThreeIcon,
    PentagonIcon,
    SquaresFourIcon,
    TriangleIcon,
} from "@phosphor-icons/react";

export type EventType =
    | "222"
    | "333"
    | "444"
    | "555"
    | "666"
    | "777"
    | "minx"
    | "pyram"
    | "sq1"
    | "clock"
    | "skewb";
export type EventTypeForViewer =
    | "2x2x2"
    | "3x3x3"
    | "4x4x4"
    | "5x5x5"
    | "6x6x6"
    | "7x7x7"
    | "megaminx"
    | "pyraminx"
    | "square1"
    | "clock"
    | "skewb";

export interface Event {
    key: EventType;
    keyForViewer: EventTypeForViewer;
    label: string;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    sessions?: string[];
}

export const events: Event[] = [
    {
        key: "222",
        keyForViewer: "2x2x2",
        label: "2x2x2",
        icon: SquaresFourIcon,
        sessions: ["Regular"],
    },
    {
        key: "333",
        keyForViewer: "3x3x3",
        label: "3x3x3",
        icon: NumberSquareThreeIcon,
        sessions: ["Regular", "One-Handed", "Blindfolded"],
    },
    {
        key: "444",
        keyForViewer: "4x4x4",
        label: "4x4x4",
        icon: NumberSquareFourIcon,
        sessions: ["Regular", "Blindfolded"],
    },
    {
        key: "555",
        keyForViewer: "5x5x5",
        label: "5x5x5",
        icon: NumberSquareFiveIcon,
        sessions: ["Regular", "Blindfolded"],
    },
    {
        key: "666",
        keyForViewer: "6x6x6",
        label: "6x6x6",
        icon: NumberSquareSixIcon,
        sessions: ["Regular"],
    },
    {
        key: "777",
        keyForViewer: "7x7x7",
        label: "7x7x7",
        icon: NumberSquareSevenIcon,
        sessions: ["Regular"],
    },
    {
        key: "minx",
        keyForViewer: "megaminx",
        label: "Megaminx",
        icon: PentagonIcon,
        sessions: ["Regular"],
    },
    {
        key: "pyram",
        keyForViewer: "pyraminx",
        label: "Pyraminx",
        icon: TriangleIcon,
        sessions: ["Regular"],
    },
    {
        key: "sq1",
        keyForViewer: "square1",
        label: "Square-1",
        icon: NumberSquareOneIcon,
        sessions: ["Regular"],
    },
    {
        key: "clock",
        keyForViewer: "clock",
        label: "Clock",
        icon: CircleNotchIcon,
        sessions: ["Regular"],
    },
    {
        key: "skewb",
        keyForViewer: "skewb",
        label: "Skewb",
        icon: DiamondIcon,
        sessions: ["Regular"],
    },
];
