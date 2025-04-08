﻿import React, {useState} from 'react';
import {GAME_CONSTANTS} from '../../@types/types';
import Grid from '@mui/material/Grid';
import {Button, Typography, Paper} from "@mui/material";
import "../../styles/GameSetup.css";

interface GameSetupProps {
    onStartGame: (rounds: number) => void;
}

/**
 * Game setup component that allows users to select number of rounds before playing
 */
const GameSetup: React.FC<GameSetupProps> = ({onStartGame}) => {
    const [rounds, setRounds] = useState<number>(5);
    const [startingBalance, setStartingBalance] = useState<number>(GAME_CONSTANTS.STARTING_BALANCE);

    // Options for number of rounds
    const roundOptions = [3, 5, 10, 20];
    // const balanceOptions = [1000, 10000, 20000, 50000];

    const handleRoundChange = (value: number) => {
        setRounds(value);
    };

    // const handleBalanceChange = (value: number) => {
    //     setStartingBalance(value);
    // };

    const handleStartGame = () => {
        onStartGame(rounds);
    };

    return (
        <Grid container spacing={3} className={"game-setup-container"}>
            {/* how to play section */}
            <Grid size={12}>
                <Paper elevation={0} className="setup-section" sx={{p: 3, mb: 2}}>
                    <h1>How to play</h1>
                    <Typography component="p">
                        Each round presents a new market event. <br/>
                        You must decide whether to invest in a company based on the
                        event. <br/>
                        Choose your investment amount and type, and select an amount of time to invest. <br/>
                        Watch your balance grow or shrink based on the event's impact. <br/><br/>
                        The game ends after{' '}
                        <Typography component="span" color="primary" fontWeight="bold" display="inline" fontSize={"20px"}>
                            {rounds}
                        </Typography>
                        {' '}rounds.
                    </Typography>
                </Paper>
            </Grid>

            {/* rounds section */}
            <Grid size={12}>
                <Paper elevation={0} className="setup-section" sx={{p: 3, mb: 2}}>
                    <Grid container>
                        <Grid size={6}>
                            <h1>Rounds</h1>
                        </Grid>
                        <Grid size={6} sx={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
                            {roundOptions.map((option) => (
                                <Button
                                    sx={{marginLeft: 2}}
                                    key={option}
                                    variant={rounds === option ? "contained" : "outlined"}
                                    onClick={() => handleRoundChange(option)}
                                >
                                    {option} Rounds
                                </Button>
                            ))}
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

            {/* balance section */}
            <Grid size={12}>
                <Paper elevation={0} className="setup-section" sx={{p: 3, mb: 2}}>
                    <Grid container>
                        <Grid size={6}>
                            <h1>Balance</h1>
                        </Grid>
                        <Grid size={6} sx={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
                            <div className={"setup-balance"} style={{fontSize: "30px", fontWeight: "bold"}}>
                                ${startingBalance.toLocaleString()}
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

            {/* start game button */}
            <Grid size={12} sx={{display: "flex", justifyContent: "center", mt: 2}}>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleStartGame}
                    sx={{minWidth: 400}}
                >
                    Start Game
                </Button>
            </Grid>

        </Grid>
    );
};

export default GameSetup;