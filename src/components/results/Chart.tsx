import { inject, observer } from "mobx-react";
import * as React from "react";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { StatisticsStore } from "../../stores/StatisticsStore";
import { TimeFormatter } from "../utils/TimeFormatter";

export interface IChartProps {
    StatisticsStore?: StatisticsStore;
}

class Chart extends React.Component<IChartProps> {
    render() {
        const { StatisticsStore } = this.props;
        const chartData = StatisticsStore.chartData;

        console.log(chartData);

        return (
            <ResponsiveContainer width="100%" maxHeight={200}>
                <LineChart
                    data={chartData}
                    margin={{ top: 12, right: 4, bottom: 12, left: 4 }}
                >
                    {/* <XAxis dataKey="id" /> */}
                    <YAxis />
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <Legend wrapperStyle={{ paddingTop: "12px" }} />
                    <Tooltip
                        formatter={(value) =>
                            TimeFormatter({ time: value as any })
                        }
                    />

                    <Line dataKey="single" stroke="#000000" dot={{ r: 2 }} />
                    <Line dataKey="avgFive" stroke="#dc2626" dot={false} />
                    <Line dataKey="avgTwelve" stroke="#2563eb" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        );
    }
}

export default inject("StatisticsStore")(observer(Chart));
