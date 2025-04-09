import React, {useEffect} from 'react';
import {Investment, InvestmentHistory} from '../../@types/types';
import {formatCurrency} from '../../utils/investmentUtils';
import {Container, Box, Paper, Typography, Grid} from "@mui/material";
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
                        <Typography>
                            <h1 style={{marginTop: "0"}}>Results</h1>
                            <h2>Final balance: {formatCurrency(balance)}</h2>
                            <h3>Total decisions: {totalInvestments}</h3>
                            <h3>Shorted: {shortInvestments}</h3>
                            <h3>Skipped opportunities: {skippedInvestments}</h3>
                        </Typography>
                    </Paper>
                </Grid>

                <Grid size={6} sx={{height: "30vh", maxHeight: "30vh"}}>
                    <Paper sx={{p: 3, mb: 2, bgcolor: '#f5f5f5', height: '100%', overflow: "auto"}}>
                            <InvestmentCards choicesToProcess={completedInvestments} areFinalized={true}/>
                            <InvestmentCards choicesToProcess={liveInvestments} areFinalized={true}
                                             liveAtGameOver={true}/>

                    </Paper>
                </Grid>

                <Grid size={12} sx={{marginTop: 5,}}>
                    {renderLineChart(balanceHistory)}
                </Grid>
            </Grid>
        </Container>
    );
};

export default EndGameSummary;