import React, { useState, useContext } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import '../styles/NavBar.css';
import AuthContext from '../AuthContext';


const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, username } = useContext(AuthContext);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/sign-in');
  };

  return (
    <AppBar position="fixed" elevation={0} className="navbar" style={{ zIndex: 100 }}>
      <Toolbar className="toolbar">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="currency-icon"
          className="currency-icon"
        >
          <CurrencyExchangeIcon />
        </IconButton>
        <Typography variant="h6" component="div" className="logo">
          Crypto Stats Tracker
        </Typography>
        <div className="nav-buttons">
          <Button
            component={RouterLink}
            to="/"
            color="inherit"
            className={location.pathname === '/' ? 'active' : ''}
          >
            Home
          </Button>
          <Button
            component={RouterLink}
            to="/pairs"
            color="inherit"
            className={location.pathname === '/pairs' ? 'active' : ''}
          >
            Currency Pairs
          </Button>
          <Button
            component={RouterLink}
            to="/details"
            color="inherit"
            className={location.pathname === '/details' ? 'active' : ''}
          >
            Currency Details
          </Button>
          {!isLoggedIn && (
            <div>
              <Button
                component={RouterLink}
                to="/sign-in"
                color="inherit"
                className={location.pathname === '/sign-in' ? 'active' : ''}
              >
                Sign-In
              </Button>
              <Button
                component={RouterLink}
                to="/sign-up"
                color="inherit"
                className={location.pathname === '/sign-up' ? 'active' : ''}
              >
                Sign-Up
              </Button>
            </div>
          )}
          {isLoggedIn && (
            <div className="account-icon">
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={handleMenu}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem>
                  <IconButton>
                    <AccountCircle fontSize="small" />
                  </IconButton>
                  {username}
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <IconButton>
                    <ExitToAppIcon fontSize="small" />
                  </IconButton>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
