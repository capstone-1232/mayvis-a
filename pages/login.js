import React, { useState, useEffect } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Stack, Tabs, Tab, Box } from '@mui/material';
import Image from 'next/image';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import loginLogo from "../public/assets/images/login_head.png";
import { GoogleLogin } from '@react-oauth/google';

const slideshowImages = [
    "/assets/images/login-slideshow-one.webp",
    "/assets/images/login-slideshow-two.webp",
    "/assets/images/login-slideshow-three.webp"
];

const LoginSignup = () => {
    const paperStyle = { padding: 20, height: '60vh', width: 600, top: '4%', margin: "0 auto", borderRadius: 20, position: 'relative', zIndex: 2 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0', borderRadius: 5, height: 40 }

    const [currentImage, setCurrentImage] = useState(0);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage(currentImage => (currentImage + 1) % slideshowImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleChangeTab = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Grid container style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
            backgroundImage: `url(${slideshowImages[currentImage]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            {/* Logo */}
            <div style={{ position: 'absolute', top: '6%', width: '100%', zIndex: 2, display: 'flex', justifyContent: 'center', borderRadius: 20, overflow: 'hidden' }}>
                <Image src={loginLogo} alt="Login Logo" width={650} height={160} objectFit="contain" style={{ borderRadius: '20px' }} />
            </div>

            {/* Login & Signup Paper */}
            <Paper elevation={10} style={paperStyle}>
                <Tabs
                    value={activeTab}
                    onChange={handleChangeTab}
                    centered
                    variant="fullWidth"
                    sx={{
                        backgroundColor: 'transparent',
                        '.MuiTabs-flexContainer': {
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                        },
                        '.MuiButtonBase-root': {
                            flexGrow: 1,
                            maxWidth: 'none',
                            borderRight: '1px solid #ccc',
                            '&:last-child': {
                                borderRight: 'none',
                            },
                        },
                        '.Mui-selected': {
                            backgroundColor: '#1976d2',
                            color: '#ffffff !important',
                            borderColor: '#1976d2',
                            zIndex: 1,
                            '&:not(:first-of-type)': {
                                borderLeft: '1px solid #1976d2',
                            },
                            '&:not(:last-child)': {
                                borderRight: '1px solid #1976d2',
                            },
                        },
                        '.MuiTabs-indicator': {
                            backgroundColor: '#000000',
                        }
                    }}
                >

                    <Tab label="Login" />
                    <Tab label="Signup" />
                </Tabs>

                <div role="tabpanel" hidden={activeTab !== 0} style={{ paddingTop: '30px' }}>
                    <Grid container direction="column" alignItems="center" justifyContent="center">
                        <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                        <Typography variant='h4' style={{ margin: '20px 0' }}>Login to get started</Typography>
                    </Grid>
                    <Stack spacing={2}>
                        <TextField label='Username' placeholder='Enter username' variant="outlined" fullWidth required />
                        <TextField label='Password' placeholder='Enter password' type='password' variant="outlined" fullWidth required />
                        <FormControlLabel control={<Checkbox name="checkedB" color="primary" />} label="Remember me" />
                        <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                        <Typography>
                            <Link href="#">Forgot password?</Link>
                        </Typography>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
                            <span style={{ flexGrow: 1, height: '1px', backgroundColor: '#000' }}></span>
                            <span style={{ margin: '0 10px', fontWeight: 'bold', color: '#000' }}>or</span>
                            <span style={{ flexGrow: 1, height: '1px', backgroundColor: '#000' }}></span>
                        </div>
                        <GoogleLogin
                            onSuccess={(credentialResponse) => {
                                console.log(credentialResponse);
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                            theme='filled_blue'
                        />
                        <Typography style={{ paddingTop: '8px' }}> Do you have an account?
                            <Link href="#" onClick={() => setActiveTab(1)}>Sign Up</Link>
                        </Typography>
                    </Stack>
                </div>
                <div role="tabpanel" hidden={activeTab !== 1} style={{ paddingTop: '30px' }}>
                    <Grid container direction="column" alignItems="center" justifyContent="center">
                        <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                        <Typography variant='h4' style={{ margin: '20px 0' }}>Sign up</Typography>
                    </Grid>
                    <Stack spacing={2}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField label='First Name' placeholder='Enter first name' variant="outlined" fullWidth required />
                            <TextField label='Last Name' placeholder='Enter last name' variant="outlined" fullWidth required />
                        </Box>
                        <TextField label='Username' placeholder='Enter username' variant="outlined" fullWidth required />
                        <TextField label='Email Address' placeholder='Enter email' variant="outlined" fullWidth required />
                        <TextField label='Password' placeholder='Enter password' type='password' variant="outlined" fullWidth required />
                        <TextField label='Confirm Password' placeholder='Confirm password' type='password' variant="outlined" fullWidth required />
                        <Button type='submit' color='primary' variant="contained" style={{btnstyle, paddingTop: '15px' }} fullWidth>Sign up</Button>
                        <Typography style={{ paddingTop: '15px' }}> Already have an account?
                            <Link href="#" onClick={() => setActiveTab(0)}>Login</Link>
                        </Typography>
                    </Stack>
                </div>
            </Paper>
        </Grid>
    );
};

export default LoginSignup;