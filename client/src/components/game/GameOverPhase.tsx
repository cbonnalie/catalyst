import EndGameSummary from "./EndGameSummary.tsx";
import {JSX} from "react";
import {Investment} from "../../@types/types.ts";

interface GameOverPhaseProps {
    userBalance: number
    completedUserInvestments: Investment[]
    liveUserInvestments: Investment[]
    finalizeGame: () => void
    finalizedGame: boolean
}

export const GameOverPhase = (
    {
        userBalance,
        completedUserInvestments,
        liveUserInvestments,
        finalizeGame,
        finalizedGame,
    }: GameOverPhaseProps): JSX.Element => {

    return (
        <div className="end-game-summary">
            <EndGameSummary
                balance={userBalance}
                completedInvestments={completedUserInvestments}
                liveInvestments={liveUserInvestments}
                finalizeGame={finalizeGame}
                finalizedGame={finalizedGame}
            />
        </div>
    )
}