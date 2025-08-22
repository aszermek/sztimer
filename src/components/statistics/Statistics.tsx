import { statisticsAtom } from "@/atoms/statisticsAtoms";
import { formatTime } from "@/lib/formatTime";
import { useAtomValue } from "jotai";
import { LineChart } from "./LineChart";

const StatItem = ({
    label,
    value,
}: {
    label: string;
    value: number | string | null;
}) => (
    <div className="flex flex-col items-center justify-center p-2 bg-gray-100 rounded-md">
        <span className="text-xs text-gray-500">{label}</span>
        <span className="text-md">{formatTime({ time: value })}</span>
    </div>
);

export const Statistics: React.FC = () => {
    const stats = useAtomValue(statisticsAtom);

    return (
        <div className="bg-white border border-border rounded-md h-fit p-4 flex flex-col lg:flex-row items-center gap-3 lg:justify-between">
            <LineChart />
            <div className="grid grid-cols-2 gap-2">
                <StatItem label="Best Single" value={stats.bestSingle} />
                <StatItem label="Worst Single" value={stats.worstSingle} />
                <StatItem label="Current Ao5" value={stats.currentAo5} />
                <StatItem label="Best Ao5" value={stats.bestAo5} />
                <StatItem label="Current Ao12" value={stats.currentAo12} />
                <StatItem label="Best Ao12" value={stats.bestAo12} />
            </div>
        </div>
    );
};
