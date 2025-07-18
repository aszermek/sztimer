import {
    ChartLineIcon,
    ListIcon,
    TimerIcon,
    WrenchIcon,
} from "@phosphor-icons/react";
import type React from "react";

export type TabKey = "timer" | "results" | "stats" | "settings";

const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: "timer", label: "Timer", icon: <TimerIcon size={24} /> },
    { key: "results", label: "Results", icon: <ListIcon size={24} /> },
    { key: "stats", label: "Stats", icon: <ChartLineIcon size={24} /> },
    { key: "settings", label: "Settings", icon: <WrenchIcon size={24} /> },
];

interface TabBarProps {
    activeTab: TabKey;
    onChange: (tab: TabKey) => void;
}

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onChange }) => {
    return (
        <nav className="flex w-full bg-[#ddff77] border-t border-border justify-around items-center p-2">
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => onChange?.(tab.key)}
                    className={`flex flex-col items-center justify-center text-xs cursor-pointer ${
                        activeTab === tab.key ? "text-black" : "text-black/50"
                    }`}
                    aria-current={activeTab === tab.key ? "page" : undefined}
                    aria-label={tab.label}
                >
                    {tab.icon}
                    <span className="mt-1">{tab.label}</span>
                </button>
            ))}
        </nav>
    );
};
