interface InvestmentListProps {
    title: string;
    investments: any[];
}

const InvestmentList = ({ title, investments }: InvestmentListProps) => (
    <div>
        <h3>{title}</h3>
        {investments.map((investment, index) => (
            <div key={index} className="summary-investment">
                <p>{investment.description}</p>
                <p>Investment: ${investment.investment_amount.toFixed(2)}</p>
                <p>Time Interval: {investment.time_interval} months</p>
                <p>Percent Change: {investment.percent_change.toFixed(2)}%</p>
                <p>
                    Gain: ${Math.round(investment.investment_amount * investment.percent_change * 100) / 100}
                </p>
            </div>
        ))}
    </div>
);

export default InvestmentList;
