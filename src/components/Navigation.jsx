import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'

function Navigation() {
  const [openMenu, setOpenMenu] = useState(null)
  const [openDrawer, setOpenDrawer] = useState(false)

  const handleMenuClick = (event) => {
    setOpenMenu(event.currentTarget)
  }

  const handleMenuClose = () => {
    setOpenMenu(null)
  }

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer)
  }

  const menuItems = [
    { label: 'Inicio', icon: <HomeIcon />, href: '/' },
    { label: 'Mis Entrenamientos', icon: <FitnessCenterIcon />, href: '/entrenamientos' },
  ]

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Logo/Título */}
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            App Training
          </Typography>

          {/* Menú Desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {menuItems.map((item) => (
              <Button
                key={item.label}
                color="inherit"
                startIcon={item.icon}
                component={RouterLink}
                to={item.href}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Botones Login/Logout Desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Button
              color="inherit"
              startIcon={<LoginIcon />}
              component={RouterLink}
              to="/login"
            >
              Login
            </Button>
            <Button
              color="inherit"
              startIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </Box>

          {/* Menú Mobile */}
          <IconButton
            color="inherit"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer Mobile */}
      <Drawer anchor="left" open={openDrawer} onClose={handleDrawerToggle}>
        <List sx={{ width: 250 }}>
          {menuItems.map((item) => (
            <ListItem 
              button 
              key={item.label} 
              component={RouterLink}
              to={item.href}
              onClick={handleDrawerToggle}
            >
              <Box sx={{ mr: 2 }}>{item.icon}</Box>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
          <ListItem 
            button
            component={RouterLink}
            to="/login"
            onClick={handleDrawerToggle}
          >
            <LoginIcon sx={{ mr: 2 }} />
            <ListItemText primary="Login" />
          </ListItem>
        </List>
      </Drawer>
    </>
  )
}

export default Navigation