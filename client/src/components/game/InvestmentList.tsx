interface InvestmentListProps {
    title: string;
    investments: any[];
    isCompleted: boolean;
}

const MONTH_COEFFICIENT = 3;

const getGain = (
    amount: number,
    percent: number,
    isShort: boolean) => {

    const gain: number = isShort
        ? Math.round((amount * -percent) * 100) / 100
        : Math.round(amount * percent * 100) / 100;

    console.log("gain", gain)

    if (gain >= 0 && isShort) {
        return ` $${gain}`;
    }

    if (gain >= 0 && !isShort) {
        return ` $${gain}`;
    }

    if (gain < 0 && isShort) {
        return ` -$${Math.abs(gain)}`;
    }

    if (gain < 0 && !isShort) {
        return ` -$${Math.abs(gain)}`;
    }
}

const InvestmentList = (
    {title, investments, isCompleted}: InvestmentListProps) => (
    <div>
        <h3>{title}</h3>

        {investments.map((investment, index) => (
            <div key={index} className="summary-investment">
                <p>{investment.description}</p>

                {investment.type === "Invest"
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
                    {
                        getGain(investment.investment_amount, investment.percent_change, investment.type === "Short")
                    }
                </p>
            </div>
        ))}
    </div>
);

export default InvestmentList;
