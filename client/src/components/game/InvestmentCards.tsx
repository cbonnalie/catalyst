import React from 'react';
import {Investment} from '../../@types/types';
import {calculateInvestmentGain, formatCurrency, formatPercentage} from '../../utils/investmentUtils';

/**
 * Props for the InvestmentCards component.
 */
interface InvestmentCardsProps {
    choicesToProcess: Investment[];
    areFinalized: boolean;
}

/**
 * Displays a card for each investment with relevant details
 */
export const InvestmentCards: React.FC<InvestmentCardsProps> = (
    {
        choicesToProcess,
        areFinalized
    }) => {
    /**
     * Renders the details of an investment based on its type and status
     */
    const renderInvestmentDetails = (investment: Investment) => {
        if (investment.type === "Skip") {
            return <p>Skipped this event</p>;
        }

        const investmentAmountFormatted = formatCurrency(investment.investment_amount);
        const percentChangeFormatted = formatPercentage(investment.percent_change);
        const gain = calculateInvestmentGain(investment);
        const gainFormatted = formatCurrency(Math.abs(gain));
        const isPositiveGain = gain >= 0;

        return (
            <>
                <p>
                    {investment.type === "Invest" ? "Investment: " : "Short: "}
                    {investmentAmountFormatted}
                </p>

                {areFinalized && (
                    <>
                        <p>Percent Change: {percentChangeFormatted}</p>
                        <p>
                            Gain: {isPositiveGain ? gainFormatted : `-${gainFormatted}`}
                        </p>
                    </>
                )}
            </>
        );
    };

    return (
        <div className="results-container">
            <h3>{areFinalized ? "Completed Investments" : "Current Investments"}</h3>

            {choicesToProcess.length === 0 ? (
                <p className="no-investments">No investments yet</p>
            ) : (
                choicesToProcess.map((investment, index) => (
                    <div key={index} className="results-wrapper">
                        <p className="result-description">{investment.description}</p>
                        {renderInvestmentDetails(investment)}
                    </div>
                ))
            )}
        </div>
    );
};