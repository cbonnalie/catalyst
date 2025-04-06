import EventCard from "../common/EventCard.tsx";
import {StatusFooter} from "../common/StatusFooter.tsx";
import {InvestmentStats} from "../common/InvestmentStats.tsx";
import {JSX} from "react";
import {Event, Investment, InvestmentHistory} from "../../@types/types.ts";

interface Props {
    currentEvent: Event;
    investmentAmount: string;
    selectedInterval: string;
    handleSubmit: () => void;
    setInvestmentAmount: (amount: string) => void;
    setSelectedInterval: (interval: "3 months" | "6 months" | "1 year" | "5 years") => void;
    balanceHistory: InvestmentHistory[];
    completedUserInvestments: Investment[];
    liveUserInvestments: Investment[];
    userBalance: number;
    finalizedGame: boolean;
    currentYear: number;
    currentQuarter: number;
}

export const ActiveGamePhase = (
    {
        userBalance,
        finalizedGame,
        currentYear,
        currentQuarter,
        balanceHistory,
        completedUserInvestments,
        liveUserInvestments,
        investmentAmount,
        selectedInterval,
        currentEvent,
        handleSubmit,
        setInvestmentAmount,
        setSelectedInterval
    }: Props
): JSX.Element => {

    return (
        <>
            <EventCard
                event={currentEvent}
                investmentAmount={investmentAmount}
                selectedInterval={selectedInterval}
                onInvestmentChange={(e) => setInvestmentAmount(e.target.value)}
                onIntervalChange={(e) => setSelectedInterval(e.target.value as "3 months" | "6 months" | "1 year" | "5 years")}
                onSubmit={handleSubmit}
            />

            <InvestmentStats
                balanceHistory={balanceHistory}
                completedUserInvestments={completedUserInvestments}
                liveUserInvestments={liveUserInvestments}
            />

            <StatusFooter
                userBalance={userBalance}
                finalizedGame={finalizedGame}
                currentYear={currentYear}
                currentQuarter={currentQuarter}
            />
        </>
    )
}