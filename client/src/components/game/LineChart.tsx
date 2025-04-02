import {LineChart, Line, Tooltip, ResponsiveContainer, XAxis, YAxis} from 'recharts';

const CustomTooltip = ({ active, payload, label }: any) => {
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

export const renderLineChart = (data: any) => {
    // find the minimum balance value in the data to set the Y-axis min value
    const minBalance = Math.min(...data.map((item: any) => item.balance));

    return (
        <ResponsiveContainer width={"100%"} height={"100%"}>
            <LineChart data={data}>
                <XAxis dataKey="turn" tick={false}/>
                <YAxis domain={[minBalance, "auto"]}/>
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="balance" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    );
}

