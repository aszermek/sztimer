import { inject, observer } from "mobx-react";
import * as React from "react";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    TooltipProps,
    XAxis,
    YAxis,
} from "recharts";
import {
    NameType,
    ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { StatisticsStore } from "../../stores/StatisticsStore";
import { TimeFormatter } from "../utils/TimeFormatter";

export interface IChartProps {
    StatisticsStore?: StatisticsStore;
}

class Chart extends React.Component<IChartProps> {
    render() {
        const { StatisticsStore } = this.props;
        const chartData = StatisticsStore.chartData;

        const CustomTooltip = (props: TooltipProps<ValueType, NameType>) => {
            const { active, payload } = props;
            if (active && payload && payload.length) {
                return (
                    <div className="flex flex-row gap-x-4 gap-y-1 flex-wrap w-full bg-white text-sm">
                        {payload.map((item, index) => {
                            return (
                                <p
                                    key={index}
                                    className={`text-[${item.stroke}]`}
                                >{`${item.name}: ${TimeFormatter({
                                    time: item.value as number,
                                })}`}</p>
                            );
                        })}
                    </div>
                );
            }

            return null;
        };

        return (
            <ResponsiveContainer width="100%" maxHeight={200}>
                <LineChart
                    data={chartData}
                    margin={{ top: 12, right: 4, bottom: 12, left: -28 }}
                >
                    {/* <XAxis dataKey="id" /> */}
                    <YAxis domain={["auto", "auto"]} />
                    <CartesianGrid vertical={false} strokeDasharray="1 0" />
                    <Legend
                        iconType="circle"
                        iconSize={6}
                        wrapperStyle={{
                            paddingTop: "12px",
                            paddingLeft: "32px",
                            fontSize: "0.75rem",
                        }}
                    />
                    <Tooltip
                        formatter={(value) =>
                            TimeFormatter({ time: value as any })
                        }
                        allowEscapeViewBox={{ y: true }}
                        position={{ y: 168 }}
                        wrapperStyle={{ outline: "none", width: "100%" }}
                        content={CustomTooltip}
                    />

                    <Line
                        dataKey="single"
                        stroke="#000000"
                        dot={false}
                        animationDuration={500}
                    />
                    <Line
                        dataKey="ao5"
                        stroke="#dc2626"
                        dot={false}
                        animationDuration={500}
                    />
                    <Line
                        dataKey="ao12"
                        stroke="#2563eb"
                        dot={false}
                        animationDuration={500}
                    />
                </LineChart>
            </ResponsiveContainer>
        );
    }
}

export default inject("StatisticsStore")(observer(Chart));
