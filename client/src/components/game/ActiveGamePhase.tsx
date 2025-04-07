import React from "react";
import EventCardInput from "../common/EventCardInput";
import {StatusFooter} from "../common/StatusFooter";
import {InvestmentStats} from "../common/InvestmentStats";
import {Event, Investment, InvestmentHistory, InvestmentType, TimeInterval} from "../../@types/types";

interface ActiveGamePhaseProps {
    currentEvent: Event;
    investmentAmount: string;
    selectedInterval: TimeInterval;
    selectedType: InvestmentType | "";
    userBalance: number;
    handleSubmit: () => void;
    setInvestmentAmount: (amount: string) => void;
    setSelectedInterval: (interval: TimeInterval) => void;
    setSelectedType: (type: InvestmentType | "") => void;
    balanceHistory: InvestmentHistory[];
    completedUserInvestments: Investment[];
    liveUserInvestments: Investment[];
    finalizedGame: boolean;
    currentYear: number;
    currentQuarter: number;
}

/**
 * Component for the active phase of the game where users make investment decisions
 */
export const ActiveGamePhase: React.FC<ActiveGamePhaseProps> = (
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
    }) => {
    /**
     * Handles type change and resets other values when "Skip" is selected
     */
    const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newType = e.target.value as InvestmentType;
        setSelectedType(newType);

        if (newType === "Skip") {
            setInvestmentAmount("");
            setSelectedInterval("");
        }
    };

    return (
        <>
            <EventCardInput
                event={currentEvent}
                investmentAmount={investmentAmount}
                selectedInterval={selectedInterval}
                selectedType={selectedType}
                userBalance={userBalance}
                onInvestmentChange={(e) => setInvestmentAmount(e.target.value)}
                onIntervalChange={(e) => setSelectedInterval(e.target.value as TimeInterval)}
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
    );
};