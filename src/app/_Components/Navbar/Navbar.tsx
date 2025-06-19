'use client'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';

import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import FacebookIcon from '@mui/icons-material/Facebook';
import Link from 'next/link';

import { useState } from 'react';
import mycookies from 'js-cookie'
import { redirect, usePathname } from 'next/navigation';


function Navbar() {
  const path = usePathname()
  const tkn = mycookies.get('tkn')
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  function hadleLogout() {
    mycookies.remove('tkn')
    handleCloseUserMenu()
    redirect('/login')
  }
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href='/'><FacebookIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /></Link>
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link href='/'>Fakeboos</Link>
          </Typography>
 
            <Link href='/'><FacebookIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /></Link>
            <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
                  >
                  <Link href='/'>Fakeboos</Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon   />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {tkn ? <Box>
              <Link href='/profile'>
                <MenuItem className={path == '/profile' ? 'active' : ''}  onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: 'center' }}>profile</Typography>
                </MenuItem>
                </Link>
                <MenuItem  onClick={hadleLogout}>
                    <Typography sx={{ textAlign: 'center' }}>logout</Typography>
                </MenuItem>
              </Box> : <Box>
                  <Link href='/login'>
                <MenuItem className={path == '/login' ? 'active' : ''}  onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: 'center' }}>login</Typography>
                </MenuItem>
              </Link>
              <Link href='/register'>
                <MenuItem className={path == '/register' ? 'active' : ''}  onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: 'center' }}>register</Typography>
                </MenuItem>
              </Link>
              </Box>}
              
              
              
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;

