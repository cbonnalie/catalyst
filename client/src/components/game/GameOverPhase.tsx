import React, { useEffect } from "react";
import EndGameSummary from "./EndGameSummary";
import { Investment } from "../../@types/types";
import { formatCurrency } from "../../utils/investmentUtils";

interface GameOverPhaseProps {
    userBalance: number;
    completedUserInvestments: Investment[];
    liveUserInvestments: Investment[];
    finalizeGame: () => void;
    finalizedGame: boolean;
}

/**
 * Component that displays the game over screen with final results
 */
export const GameOverPhase: React.FC<GameOverPhaseProps> = ({
                                                                userBalance,
                                                                completedUserInvestments,
                                                                liveUserInvestments,
                                                                finalizeGame,
                                                                finalizedGame,
                                                            }) => {
    // Ensure game is finalized when this component mounts
    useEffect(() => {
        if (!finalizedGame) {
            finalizeGame();
        }
    }, [finalizedGame, finalizeGame]);

    // Calculate statistics
    const totalInvestments = completedUserInvestments.length + liveUserInvestments.length;
    const positiveInvestments = [...completedUserInvestments, ...liveUserInvestments].filter(
        inv => inv.percent_change > 0
    ).length;

    const positiveRate = totalInvestments > 0
        ? Math.round((positiveInvestments / totalInvestments) * 100)
        : 0;

    const initialBalance = 10000; // assuming this is the starting balance
    const totalReturn = userBalance - initialBalance;
    const returnPercentage = (totalReturn / initialBalance) * 100;

    return (
        <div className="game-over-container">
            <div className="game-over-header">
                <h1>Game Over</h1>
                <h2>Final Balance: {formatCurrency(userBalance)}</h2>
            </div>

            <div className="game-stats">
                <div className="stat-box">
                    <h3>Total Return</h3>
                    <p className={totalReturn >= 0 ? "positive" : "negative"}>
                        {totalReturn >= 0 ? "+" : ""}{formatCurrency(totalReturn)}
                        ({returnPercentage.toFixed(1)}%)
                    </p>
                </div>

                <div className="stat-box">
                    <h3>Success Rate</h3>
                    <p>{positiveRate}% ({positiveInvestments}/{totalInvestments})</p>
                </div>
            </div>

            <EndGameSummary
                balance={userBalance}
                completedInvestments={completedUserInvestments}
                liveInvestments={liveUserInvestments}
                finalizeGame={finalizeGame}
                finalizedGame={finalizedGame}
            />

            <div className="game-over-actions">
                <button className="play-again-button">Play Again</button>
                <button className="share-results-button">Share Results</button>
            </div>
        </div>
    );
};