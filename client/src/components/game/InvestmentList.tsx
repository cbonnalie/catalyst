interface InvestmentListProps {
    title: string;
    investments: any[];
    isCompleted: boolean;
}

const MONTH_COEFFICIENT = 3;

const getGain = (
    amount: number,
    percent: number,
    positive: boolean,
    isShort: boolean) => {

    const gain: number = isShort
        ? Math.round(amount + (amount * percent * 100) / 100)
        : Math.round(amount * percent * 100) / 100;

    return (
        positive
            ? ` $${gain}`
            : ` -$${Math.abs(gain)}`
    );
}

const InvestmentList = (
    {title, investments, isCompleted}: InvestmentListProps) => (
    <div>
        <h3>{title}</h3>
        {/* Iterate through each investment in the list */}
        {investments.map((investment, index) => (
            <div key={index} className="summary-investment">
                <p>{investment.description}</p>

                {investment.type === "Investment"
                    ? <p>Investment: ${investment.investment_amount.toFixed(2)}</p>
                    : (
                        investment.type === "Short"
                            ? <p>Short: ${investment.investment_amount.toFixed(2)}</p>
                            : <></>
                    )
                }

                <p>
                    Length of Investment: {MONTH_COEFFICIENT * investment.time_interval}{" "}
                    {investment.time_interval === 1 ? "month" : "months"}
                </p>

                {!isCompleted && (
                    <p>
                        Time Remaining: {MONTH_COEFFICIENT * investment.time_remaining}{" "}
                        {investment.time_remaining === 1 ? "month" : "months"}
                    </p>
                )}

                <p>Percent Change: {(investment.percent_change * 100).toFixed(0)}%</p>

                <p>
                    Gain:
                    {investment.percent_change > 0
                        ? getGain(investment.investment_amount, investment.percent_change, true, investment.type === "Short")
                        : getGain(investment.investment_amount, investment.percent_change, false, investment.type === "Short")
                    }
                </p>
            </div>
        ))}
    </div>
);

export default InvestmentList;
