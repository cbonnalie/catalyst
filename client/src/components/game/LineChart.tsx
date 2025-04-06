import {AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine} from 'recharts';
import {InvestmentHistory} from "../../@types/types.ts";

const THRESHOLD = 10000;

const CustomTooltip = ({active, payload, label}: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`Turn: ${label}`}</p>
                <p className="intro">{`Balance: $${payload[0].value.toFixed(2)}`}</p>
            </div>
        );
    }
    return null;
}

// Modified gradient offset calculation for custom threshold
const gradientOffset = (data: InvestmentHistory[], threshold: number) => {
    const dataMax = Math.max(...data.map((i) => i.balance));
    const dataMin = Math.min(...data.map((i) => i.balance));

    // If all values are below threshold
    if (dataMax <= threshold) {
        return 0;
    }
    // If all values are above threshold
    if (dataMin >= threshold) {
        return 1;
    }

    // Calculate the relative position of threshold between min and max
    return (dataMax - threshold) / (dataMax - dataMin);
};

export const renderLineChart = (data: InvestmentHistory[]) => {
    const minBalance = Math.min(...data.map((item) => item.balance));
    const off = gradientOffset(data, THRESHOLD);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <XAxis dataKey="turn" tick={false}/>
                <YAxis domain={[Math.min(minBalance * 0.9, THRESHOLD * 0.9), "auto"]}/>
                <Tooltip content={<CustomTooltip/>}/>
                {<ReferenceLine y={THRESHOLD} stroke="gray" strokeDasharray="3 3" />}

                <defs>
                    <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset={off} stopColor="green" stopOpacity={0.8} />
                        <stop offset={off} stopColor="red" stopOpacity={0.8} />
                    </linearGradient>
                </defs>
                {/* Single area with gradient fill */}
                <Area
                    type="monotone"
                    dataKey="balance"
                    stroke="black"
                    fill="url(#splitColor)"
                    baseValue={THRESHOLD}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}