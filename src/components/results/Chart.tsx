import { inject, observer } from "mobx-react";
import * as React from "react";
import { Line, LineChart, XAxis, YAxis } from "recharts";
import { StatisticsStore } from "../../stores/StatisticsStore";

export interface IChartProps {
    StatisticsStore?: StatisticsStore;
}

class Chart extends React.Component<IChartProps> {
    render() {
        const { StatisticsStore } = this.props;
        const results = StatisticsStore.results;

        return (
            <LineChart width={300} height={200} data={results}>
                <Line dataKey="time" />
                <XAxis dataKey="id" />
                <YAxis />
            </LineChart>
        )
    }
}

export default inject('StatisticsStore')(observer(Chart));
