import type { CubingIconProps } from "@/components/CubingIcon";
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
    icon?: CubingIconProps;
    sessions?: string[];
}

export const events: Event[] = [
    {
        key: "222",
        keyForViewer: "2x2x2",
        label: "2x2x2",
        icon: { icon: SquaresFourIcon },
        sessions: ["Regular"],
    },
    {
        key: "333",
        keyForViewer: "3x3x3",
        label: "3x3x3",
        icon: { icon: NumberSquareThreeIcon },
        sessions: ["Regular", "One-Handed", "Blindfolded"],
    },
    {
        key: "444",
        keyForViewer: "4x4x4",
        label: "4x4x4",
        icon: { icon: NumberSquareFourIcon },
        sessions: ["Regular", "Blindfolded"],
    },
    {
        key: "555",
        keyForViewer: "5x5x5",
        label: "5x5x5",
        icon: { icon: NumberSquareFiveIcon },
        sessions: ["Regular", "Blindfolded"],
    },
    {
        key: "666",
        keyForViewer: "6x6x6",
        label: "6x6x6",
        icon: { icon: NumberSquareSixIcon },
        sessions: ["Regular"],
    },
    {
        key: "777",
        keyForViewer: "7x7x7",
        label: "7x7x7",
        icon: { icon: NumberSquareSevenIcon },
        sessions: ["Regular"],
    },
    {
        key: "minx",
        keyForViewer: "megaminx",
        label: "Megaminx",
        icon: { icon: PentagonIcon },
        sessions: ["Regular"],
    },
    {
        key: "pyram",
        keyForViewer: "pyraminx",
        label: "Pyraminx",
        icon: { icon: TriangleIcon },
        sessions: ["Regular"],
    },
    {
        key: "sq1",
        keyForViewer: "square1",
        label: "Square-1",
        icon: { icon: NumberSquareOneIcon },
        sessions: ["Regular"],
    },
    {
        key: "clock",
        keyForViewer: "clock",
        label: "Clock",
        icon: { icon: CircleNotchIcon },
        sessions: ["Regular"],
    },
    {
        key: "skewb",
        keyForViewer: "skewb",
        label: "Skewb",
        icon: { icon: DiamondIcon },
        sessions: ["Regular"],
    },
];
