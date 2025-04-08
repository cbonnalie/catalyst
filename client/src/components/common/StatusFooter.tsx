import React from "react";
import { Grid, Typography } from "@mui/material";

interface StatusFooterProps {
    userBalance: number;
    finalizedGame: boolean;
    currentYear: number;
    currentQuarter: number;
}

export const StatusFooter: React.FC<StatusFooterProps> = ({
                                                              userBalance,
                                                              finalizedGame,
                                                              currentYear,
                                                              currentQuarter
                                                          }) => {
    return (
        <Grid container alignItems="center" justifyContent="space-between">
            {/* Balance Display */}
            <Grid size={6}>
                <Typography variant="h6" fontWeight="bold">
                    ${userBalance.toFixed(2)}
                </Typography>
            </Grid>

            {/* Date Display */}
            <Grid size={6} sx={{ textAlign: "right" }}>
                {!finalizedGame && (
                    <Typography variant="h6">
                        Year {currentYear} Quarter {currentQuarter}
                    </Typography>
                )}
            </Grid>
        </Grid>
    );
};