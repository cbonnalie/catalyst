import React from 'react';
import {
    AppBar,
    Toolbar,
    Button,
    Box,
} from '@mui/material';
import {Link} from 'react-router-dom';

// Assuming your logo is at this path
const LOGO = "client/src/assets/logo.png";

export const Header: React.FC = () => {
    return (
        <header className="App-header">
            <AppBar position="static" color="transparent" elevation={1}
                    sx={{minWidth: '100%'}}
            >

                <Toolbar disableGutters sx={{display: 'flex', justifyContent: 'space-between'}}>
                    {/* Logo */}
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <img
                            src={LOGO}
                            alt="Logo"
                            style={{
                                height: '40px',
                                paddingLeft: '10px'
                            }}
                            onClick={
                                () => window.location.href = '/'
                            }
                        />
                    </Box>

                    {/* Navigation */}
                    <Box sx={{display: 'flex', gap: 2}}>
                        <Button
                            component={Link}
                            to="/"
                            color="inherit"
                        >
                            Home
                        </Button>
                        <Button
                            component={Link}
                            to="/about"
                            color="inherit"
                        >
                            About
                        </Button>
                        <Button
                            component={Link}
                            to="/play"
                            color="inherit"
                        >
                            Play
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </header>
    );
}

export default Header;