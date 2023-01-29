import {
    Icon222,
    Icon333,
    Icon444,
    Icon555,
    Icon666,
    Icon777,
    IconClock,
    IconMinx,
    IconPyram,
    IconSkewb,
    IconSq1,
} from "../components/assets/CubingIcons/CubingIcons";
import { IIconProps } from "../components/UI/Icon";

export type EventTypes =
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
export type EventTypesForViewer =
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

export interface IEvent {
    key: EventTypes;
    keyForViewer: EventTypesForViewer;
    label: string;
    icon?: IIconProps;
    sessions?: string[];
}

export const Events: IEvent[] = [
    {
        key: "222",
        keyForViewer: "2x2x2",
        label: "2x2x2",
        icon: { icon: Icon222 },
        sessions: ["Regular"],
    },
    {
        key: "333",
        keyForViewer: "3x3x3",
        label: "3x3x3",
        icon: { icon: Icon333 },
        sessions: ["Regular", "One-Handed"],
    },
    {
        key: "444",
        keyForViewer: "4x4x4",
        label: "4x4x4",
        icon: { icon: Icon444 },
        sessions: ["Regular"],
    },
    {
        key: "555",
        keyForViewer: "5x5x5",
        label: "5x5x5",
        icon: { icon: Icon555 },
        sessions: ["Regular"],
    },
    {
        key: "666",
        keyForViewer: "6x6x6",
        label: "6x6x6",
        icon: { icon: Icon666 },
        sessions: ["Regular"],
    },
    {
        key: "777",
        keyForViewer: "7x7x7",
        label: "7x7x7",
        icon: { icon: Icon777 },
        sessions: ["Regular"],
    },
    {
        key: "minx",
        keyForViewer: "megaminx",
        label: "Megaminx",
        icon: { icon: IconMinx },
        sessions: ["Regular"],
    },
    {
        key: "pyram",
        keyForViewer: "pyraminx",
        label: "Pyraminx",
        icon: { icon: IconPyram },
        sessions: ["Regular"],
    },
    {
        key: "sq1",
        keyForViewer: "square1",
        label: "Square-1",
        icon: { icon: IconSq1 },
        sessions: ["Regular"],
    },
    {
        key: "clock",
        keyForViewer: "clock",
        label: "Clock",
        icon: { icon: IconClock },
        sessions: ["Regular"],
    },
    {
        key: "skewb",
        keyForViewer: "skewb",
        label: "Skewb",
        icon: { icon: IconSkewb },
        sessions: ["Regular"],
    },
];
