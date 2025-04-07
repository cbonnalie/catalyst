import React, {useEffect} from 'react';
import InvestmentList from './InvestmentList';
import {Investment} from '../../@types/types';
import {formatCurrency} from '../../utils/investmentUtils';

interface EndGameSummaryProps {
    balance: number;
    completedInvestments: Investment[];
    liveInvestments: Investment[];
    finalizeGame: () => void;
    finalizedGame: boolean;
}

/**
 * Displays a summary of the game results when the game is over
 */
const EndGameSummary: React.FC<EndGameSummaryProps> = (
    {
        balance,
        completedInvestments,
        liveInvestments,
        finalizeGame,
        finalizedGame
    }) => {
    // Ensure the game is finalized
    useEffect(() => {
        if (!finalizedGame) {
            finalizeGame();
        }
    }, [finalizedGame, finalizeGame]);

    // Calculate some statistics
    const totalInvestments = completedInvestments.length + liveInvestments.length;

    const skippedInvestments = [...completedInvestments, ...liveInvestments]
        .filter(inv => inv.type === "Skip")
        .length;

    const shortInvestments = [...completedInvestments, ...liveInvestments]
        .filter(inv => inv.type === "Short")
        .length;

    return (
        <div className="end-game-summary">
            <h1>End Game Summary</h1>
            <h2>Final Balance: {formatCurrency(balance)}</h2>

            <div className="investment-summary-stats">
                <div className="summary-stat">
                    <span className="stat-label">{`Total Decisions: `}</span>
                    <span className="stat-value">{totalInvestments}</span>
                </div>
                <div className="summary-stat">
                    <span className="stat-label">{`Shorted: `}</span>
                    <span className="stat-value">{shortInvestments}</span>
                </div>
                <div className="summary-stat">
                    <span className="stat-label">{`Skipped Opportunities: `}</span>
                    <span className="stat-value">{skippedInvestments}</span>
                </div>
            </div>

            <div className="investments-container">
                <InvestmentList
                    title="Completed Investments"
                    investments={completedInvestments}
                    isCompleted={true}
                />

                {liveInvestments.length > 0 && (
                    <InvestmentList
                        title="Live Investments Cashed Out at End"
                        investments={liveInvestments}
                        isCompleted={false}
                    />
                )}
            </div>
        </div>
    );
};

export default EndGameSummary;