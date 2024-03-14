import * as React from 'react';
import { Menu, MenuItem, Badge, Typography, Toolbar, Stack, Box, AppBar, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';

import HomeIcon from '@mui/icons-material/Home';
import ProposalIcon from '@mui/icons-material/Description';
import ClientsIcon from '@mui/icons-material/People';
import CategoriesIcon from '@mui/icons-material/Category';
import ProductsServicesIcon from '@mui/icons-material/LocalMall';
import ReportsIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/ExitToApp';
import Link from 'next/link';


const drawerWidth = 200;

function NavBarComponent(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


    const menuItems = [
        { text: 'Home', icon: <HomeIcon />, href: '/' },
        { text: 'Proposal', icon: <ProposalIcon />, href: '/proposal' },
        { text: 'Clients', icon: <ClientsIcon />, href: '/client' },
        { text: 'Categories', icon: <CategoriesIcon />, href: '/category' },
        { text: <>Products/<br />Services</>, icon: <ProductsServicesIcon />, href: '/products' },
        { text: 'Reports', icon: <ReportsIcon />, href: '/' },
        { text: 'Logout', icon: <LogoutIcon />, href: '/' },
    ];

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Home</MenuItem>
            <MenuItem onClick={handleMenuClose}>My Proposals</MenuItem>
            <MenuItem component={Link} href="/letter">Setup Customer Letter</MenuItem>
            <Divider />
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>

        </Menu >
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}

        >
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 5 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={5} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    const drawer = (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* <Toolbar sx={{ marginTop:1 }} /> */}
            {/* <Divider sx={{ backgroundColor: (mobileOpen ? '#405CAA' : 'transparent') }} /> */}
            <Stack sx={{ backgroundColor: '#405CAA', height: '100%', marginTop: 9.3 }}>
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {menuItems.slice(0, -1).map((item) => ( // Exclude the logout item
                            <Link href={item.href} passHref key={item.text}>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        sx={{
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            color: 'white',
                                            marginTop: '1rem',
                                            '&:hover': {
                                                backgroundColor: '#3AC6ED',
                                                '.MuiListItemText-root .MuiTypography-root': {
                                                    color: 'white',
                                                },
                                                '.MuiListItemIcon-root': {
                                                    color: 'white',
                                                },
                                            },
                                            '.MuiListItemIcon-root': {
                                                minWidth: 'auto',
                                                justifyContent: 'center',
                                                fontSize: '3rem',
                                                color: 'white',
                                            },
                                            '.MuiListItemText-root .MuiTypography-root': {
                                                fontSize: '1.25rem',
                                                color: '#3AC6ED',
                                                textAlign: 'center',
                                                textDecoration: 'none',
                                            },
                                        }}
                                    >
                                        <ListItemIcon>
                                            {React.cloneElement(item.icon, { fontSize: 'large' })}
                                        </ListItemIcon>
                                        <ListItemText primary={item.text} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))}
                    </List>

                </Box>
                <Box sx={{ mt: 'auto', width: '100%' }}>
                    <Divider sx={{ backgroundColor: 'white' }} />
                    <List><Link href={'./login'}>
                        <ListItem key="Logout" disablePadding>

                            <ListItemButton sx={{
                                flexDirection: 'column', alignItems: 'center', color: 'white', '&:hover': {
                                    backgroundColor: '#3AC6ED',
                                    '.MuiListItemText-root .MuiTypography-root': {
                                        color: 'white',
                                    },
                                    '.MuiListItemIcon-root': {
                                        color: 'white',
                                    },
                                },
                                '.MuiListItemIcon-root': {
                                    minWidth: 'auto',
                                    justifyContent: 'center',
                                    fontSize: '3rem',
                                    color: 'white',
                                },
                                '.MuiListItemText-root .MuiTypography-root': {
                                    fontSize: '1.25rem',
                                    color: '#3AC6ED',
                                    textAlign: 'center',
                                    textDecoration: 'none',
                                }
                            }}>
                                <ListItemIcon sx={{ fontSize: '3rem', color: 'white' }}>
                                    {React.cloneElement(menuItems[menuItems.length - 1].icon, { fontSize: 'large' })}
                                </ListItemIcon>
                                <ListItemText primary={menuItems[menuItems.length - 1].text} sx={{ '& .MuiTypography-root': { fontSize: '1.25rem', color: 'white' } }} />
                            </ListItemButton>

                        </ListItem> </Link>
                    </List>
                </Box>
            </Stack>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    ml: { sm: `${drawerWidth}px` },
                    backgroundColor: 'black',
                }}
            >
                <Toolbar >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon sx={{ fontSize: 30 }} />
                    </IconButton>
                    <Typography variant="h3" noWrap component="div">
                        MAYVIS
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={5} color="error">
                                <NotificationsIcon sx={{ fontSize: 30 }} />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle sx={{ fontSize: 50 }} />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon sx={{ fontSize: 50 }} />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            {renderMobileMenu}
            {renderMenu}
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}

                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    // container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: 'transparent' },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: 'transparent' },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <br />
            <br />
            <br />
            <br />



        </Box>

    );

}

export default NavBarComponent;
