import {Investment} from "../../@types/types";

/**
 * Props for the InvestmentResults component.
 */
interface InvestmentResultsProps {
    choicesToProcess: Investment[];
    areFinalized: boolean;
}

/**
 * Displays the results of user investments.
 */
export const InvestmentCards = (
    {
        choicesToProcess,
        areFinalized,
    }: InvestmentResultsProps) => {
    const getInvestmentResultDetails = (choice: Investment) => {
        if (choice.type === "Skip") {
            return null;
        }

        const investmentAmount = choice.investment_amount.toFixed(2);
        const percentChange = (choice.percent_change * 100).toFixed(0);

        if (choice.type === "Invest") {
            const gain = (choice.investment_amount * choice.percent_change).toFixed(2);
            return (
                <>
                    <p>Investment: ${investmentAmount}</p>
                    {areFinalized && (
                        <>
                            <p>Percent Change: {percentChange}%</p>
                            <p>Gain: ${gain}</p>
                        </>
                    )}
                </>
            );
        } else {
            const gain = (choice.investment_amount + (choice.investment_amount * choice.percent_change)).toFixed(2);
            return (
                <>
                    <p>Short: ${investmentAmount}</p>
                    {areFinalized && (
                        <>
                            <p>Percent Change: {percentChange}%</p>
                            <p>Gain: ${parseFloat(investmentAmount) - parseFloat(gain)}</p>
                        </>
                    )}
                </>
            )
        }
    }
    return (
        <div className="results-container">
            <h3>{areFinalized ? "Completed Investments" : "Current Investments"}</h3>
            {choicesToProcess.map((choice, index) => (
                <div key={index} className="results-wrapper">
                    <p className="result-description">{choice.description}</p>
                    {getInvestmentResultDetails(choice)}
                </div>
            ))}
        </div>
    )
}