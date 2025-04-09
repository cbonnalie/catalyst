import React, {useEffect} from 'react';
import {Investment, InvestmentHistory} from '../../@types/types';
import {formatCurrency} from '../../utils/investmentUtils';
import {Container, Divider, Paper, Typography, Grid, Box} from "@mui/material";
import {renderLineChart} from "./LineChart.tsx";
import {InvestmentCards} from "./InvestmentCards.tsx";

interface EndGameSummaryProps {
    balance: number;
    balanceHistory: InvestmentHistory[];
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
        balanceHistory,
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
        <Container maxWidth={"xl"}>
            <Grid container spacing={4} sx={{height: "calc(100vh - 110px)"}}>
                <Grid size={6} sx={{height: "30vh", maxHeight: "30vh"}}>
                    <Paper sx={{p: 3, mb: 2, bgcolor: '#f5f5f5', height: '100%', overflow: 'hidden'}}>
                        <Typography variant="h6" gutterBottom>
                            Results
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1.5 }}>
                                Final balance: {formatCurrency(balance)}
                            </Typography>
                            <Divider sx={{ my: 1.5 }} />
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                Total decisions: {totalInvestments}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                Shorted: {shortInvestments}
                            </Typography>
                            <Typography variant="body1">
                                Skipped opportunities: {skippedInvestments}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid size={6} sx={{height: "30vh", maxHeight: "30vh"}}>
                    <Paper sx={{p: 3, mb: 2, bgcolor: '#f5f5f5', height: '100%', overflow: "auto"}}>
                        <InvestmentCards choicesToProcess={completedInvestments} areFinalized={true}/>
                        <Divider sx={{my: 5}}/>
                        <InvestmentCards choicesToProcess={liveInvestments} areFinalized={true}
                                         liveAtGameOver={true}/>

                    </Paper>
                </Grid>

                <Grid size={12} sx={{mt: 3, height: "40vh", maxHeight: "40vh"}}>
                    <Paper sx={{p: 3, bgcolor: '#f5f5f5', height: '100%'}}>
                        <Typography variant="h6" gutterBottom>
                            Balance History
                        </Typography>
                        <Box sx={{height: '100%'}}>
                            {renderLineChart(balanceHistory)}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default EndGameSummary;