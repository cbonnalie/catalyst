import React from "react";
import { Grid, Typography, Paper, Box } from "@mui/material";
import { renderLineChart } from "../game/LineChart.tsx";
import { InvestmentCards } from "../game/InvestmentCards.tsx";
import { Investment, InvestmentHistory } from "../../@types/types.ts";

interface InvestmentStatsProps {
    balanceHistory: InvestmentHistory[];
    completedUserInvestments: Investment[];
    liveUserInvestments: Investment[];
}

export const InvestmentStats: React.FC<InvestmentStatsProps> = ({
                                                                    balanceHistory,
                                                                    completedUserInvestments,
                                                                    liveUserInvestments
                                                                }) => {
    return (
        <Grid container spacing={1} sx={{ height: "100%", maxHeight: "40vh", padding: "20px 0" }}>

            {/* Completed Investments Column */}
            <Grid size={4} sx={{ height: "100%" }}>
                <Paper sx={{
                    p: 1,
                    bgcolor: '#f8f8f8',
                    height: "100%",
                    maxHeight: "calc(100vh - 300px)",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden"
                }}>
                    <Typography variant="subtitle1" fontWeight="medium">Completed Investments</Typography>
                    <Box sx={{
                        flex: 1,
                        overflow: "auto",
                        maxHeight: "calc(100% - 30px)"
                    }}>
                        <InvestmentCards choicesToProcess={completedUserInvestments} areFinalized={true} />
                    </Box>
                </Paper>
            </Grid>

            {/* Balance Chart Column */}
            <Grid size={4} sx={{ height: "100%", minHeight: "40vh" }}>
                <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                    <Box sx={{ flex: 1, height: "calc(100% - 30px)" }}>
                        {renderLineChart(balanceHistory)}
                    </Box>
                </Box>
            </Grid>

            {/* Live Investments Column */}
            <Grid size={4} sx={{ height: "100%" }}>
                <Paper sx={{
                    p: 1,
                    bgcolor: '#f8f8f8',
                    height: "100%",
                    maxHeight: "calc(100vh - 300px)",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden"
                }}>
                    <Typography variant="subtitle1" fontWeight="medium">Active Investments</Typography>
                    <Box sx={{
                        flex: 1,
                        overflow: "auto",
                        maxHeight: "calc(100% - 30px)"
                    }}>
                        <InvestmentCards choicesToProcess={liveUserInvestments} areFinalized={false} />
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};