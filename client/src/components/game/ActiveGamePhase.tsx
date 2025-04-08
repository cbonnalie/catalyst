import React from "react";
import {Container, Paper, Box} from "@mui/material";
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
export const ActiveGamePhase: React.FC<ActiveGamePhaseProps> = ({
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
        <Container maxWidth={"xl"} sx={{height: "100vh"}}>
            <Box
                sx={{
                    height: "calc(100vh - 110px)", // Accounting for header height & navigation
                    display: "flex",
                    flexDirection: "column",
                    p: 1,
                    justifyContent: "space-between"
                }}
            >
                {/* Event Card Section - Top section */}
                <Box paddingBottom={"50px"}>
                    <Paper sx={{ p: 1, mb: 1 }}>
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
                    </Paper>
                </Box>

                {/* Investment Stats Section - Middle section */}
                <Box sx={{ flex: 1, mb: 1, overflow: "hidden" }}>
                    <Paper sx={{ p: 1, height: "100%" }}>
                        <InvestmentStats
                            balanceHistory={balanceHistory}
                            completedUserInvestments={completedUserInvestments}
                            liveUserInvestments={liveUserInvestments}
                        />
                    </Paper>
                </Box>

                {/* Status Footer - Bottom section */}
                <Box>
                    <Paper sx={{ p: 1 }}>
                        <StatusFooter
                            userBalance={userBalance}
                            finalizedGame={finalizedGame}
                            currentYear={currentYear}
                            currentQuarter={currentQuarter}
                        />
                    </Paper>
                </Box>
            </Box>
        </Container>
    );
};