import EventCardInput from "../common/EventCardInput.tsx";
import {StatusFooter} from "../common/StatusFooter.tsx";
import {InvestmentStats} from "../common/InvestmentStats.tsx";
import React, {JSX} from "react";
import {Event, Investment, InvestmentHistory} from "../../@types/types.ts";

interface Props {
    currentEvent: Event;
    investmentAmount: string;
    selectedInterval: string;
    selectedType: string;
    handleSubmit: () => void;
    setInvestmentAmount: (amount: string) => void;
    setSelectedInterval: (interval: "" | "3 months" | "6 months" | "1 year" | "5 years") => void;
    setSelectedType: (type: "Invest" | "Short" | "Skip") => void;
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
        selectedType,
        currentEvent,
        handleSubmit,
        setInvestmentAmount,
        setSelectedInterval,
        setSelectedType,
    }: Props
): JSX.Element => {

    const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedType(e.target.value as "Invest" | "Short" | "Skip");
        if (e.target.value === "Skip") {
            setInvestmentAmount("");
            setSelectedInterval("");
        }
    }

    return (
        <>
            <EventCardInput
                event={currentEvent}
                investmentAmount={investmentAmount}
                selectedInterval={selectedInterval}
                selectedType={selectedType}
                onInvestmentChange={(e) => setInvestmentAmount(e.target.value)}
                onIntervalChange={(e) => setSelectedInterval(e.target.value as "3 months" | "6 months" | "1 year" | "5 years")}
                onTypeChange={handleTypeChange}
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