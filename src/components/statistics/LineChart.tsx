import { statisticsAtom } from "@/atoms/statisticsAtoms";
import { useAtomValue } from "jotai";
import { ResponsiveLine } from "@nivo/line";

export const LineChart: React.FC = () => {
    const { chartData } = useAtomValue(statisticsAtom);

    const formattedData = [
        {
            id: "Single",
            data: chartData
                .filter((d) => d.single !== null)
                .map((d) => ({ x: d.id, y: d.single as number })),
        },
        {
            id: "Ao5",
            data: chartData
                .filter((d) => d.ao5 !== null)
                .map((d) => ({ x: d.id, y: d.ao5 as number })),
        },
        {
            id: "Ao12",
            data: chartData
                .filter((d) => d.ao12 !== null)
                .map((d) => ({ x: d.id, y: d.ao12 as number })),
        },
    ];

    if (chartData.length < 2) return null;

    return (
        <div className="w-[36vw] h-64">
            <ResponsiveLine
                data={formattedData}
                margin={{ top: 12, right: 20, bottom: 48, left: 40 }}
                xScale={{ type: "point" }}
                yScale={{ type: "linear", min: "auto", max: "auto" }}
                axisLeft={{
                    legend: "Time (s)",
                    legendOffset: -45,
                    legendPosition: "middle",
                    tickValues: 5,
                }}
                axisBottom={null}
                enableGridX={false}
                enablePoints={false}
                enableSlices="x"
                colors={{ scheme: "set1" }}
                lineWidth={2}
                useMesh={false}
                legends={[
                    {
                        anchor: "bottom",
                        direction: "row",
                        justify: false,
                        translateX: 0,
                        translateY: 40,
                        itemsSpacing: 10,
                        itemDirection: "left-to-right",
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.85,
                        symbolSize: 12,
                        symbolShape: "circle",
                    },
                ]}
                sliceTooltip={({ slice }) => (
                    <div
                        style={{
                            background: "white",
                            padding: "9px 12px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    >
                        <div className="font-bold mb-1">
                            Solve {slice.points[0].data.x}
                        </div>
                        {slice.points.map((point) => (
                            <div
                                key={point.seriesId}
                                className="flex items-center gap-2 text-sm"
                            >
                                <div
                                    style={{
                                        backgroundColor: point.seriesColor,
                                        width: "12px",
                                        height: "12px",
                                        borderRadius: "2px",
                                    }}
                                />
                                <span>{point.seriesId}:</span>
                                <span className="font-semibold">
                                    {(point.data.y as number).toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            />
        </div>
    );
};
