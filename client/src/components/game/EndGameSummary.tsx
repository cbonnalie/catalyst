import InvestmentList from "./InvestmentList";

interface EndGameSummaryProps {
    balance: number;
    completedInvestments: any[];
    liveInvestments: any[];
    finalizeGame: () => void;
    finalizedGame: boolean;
}

const EndGameSummary = ({
                            balance,
                            completedInvestments,
                            liveInvestments,
                            finalizeGame,
                            finalizedGame
                        }: EndGameSummaryProps) => {
    if (!finalizedGame) finalizeGame();

    return (
        <div>
            <h1>End Game Summary</h1>
            <h2>Final Balance: ${balance.toFixed(2)}</h2>
            <InvestmentList
                title="Completed Investments"
                investments={completedInvestments}
                isCompleted={true}
            />
            {liveInvestments.length > 0 &&
                <InvestmentList
                    title="Live Investments Cashed Out at End"
                    investments={liveInvestments}
                    isCompleted={false}
                />
            }
        </div>
    );
};

export default EndGameSummary;
