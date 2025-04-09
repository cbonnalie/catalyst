import React, {useEffect} from "react";
import EndGameSummary from "./EndGameSummary";
import {Investment, InvestmentHistory} from "../../@types/types";

interface GameOverPhaseProps {
    userBalance: number;
    balanceHistory: InvestmentHistory[];
    completedUserInvestments: Investment[];
    liveUserInvestments: Investment[];
    finalizeGame: () => void;
    finalizedGame: boolean;
}

/**
 * Component that displays the game over screen with final results
 */
export const GameOverPhase: React.FC<GameOverPhaseProps> = (
    {
        userBalance,
        balanceHistory,
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

    return (
        <EndGameSummary
            balance={userBalance}
            balanceHistory={balanceHistory}
            completedInvestments={completedUserInvestments}
            liveInvestments={liveUserInvestments}
            finalizeGame={finalizeGame}
            finalizedGame={finalizedGame}
        />
    );
};