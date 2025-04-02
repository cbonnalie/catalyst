import {LineChart, Line, Tooltip, ResponsiveContainer, XAxis, YAxis} from 'recharts';
import {InvestmentHistory} from "../../@types/types.ts";

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

export const renderLineChart = (data: InvestmentHistory[]) => {
    const minBalance = Math.min(...data.map((item) => item.balance));

    return (
        <ResponsiveContainer width={"100%"} height={"100%"}>
            <LineChart data={data}>
                <XAxis dataKey="turn" tick={false} hide={true}/>
                <YAxis domain={[minBalance, "auto"]} tick={false} hide={true}/>
                <Tooltip content={<CustomTooltip/>}/>
                <Line
                    type="linear"
                    dataKey="balance"
                    stroke="#3e8e41"
                    strokeWidth={3}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}

