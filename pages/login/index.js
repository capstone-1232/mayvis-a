import React, { useState, useEffect } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Stack, Tabs, Tab, Box, Snackbar, Alert, Slide } from '@mui/material';
import Image from 'next/image';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import loginLogo from "../../public/assets/images/login_head.png";
// import { GoogleLogin } from '@react-oauth/google';
// import { GoogleOAuthProvider } from "@react-oauth/google";
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from 'next/router';

const slideshowImages = [
    "/assets/images/login-slideshow-one.webp",
    "/assets/images/login-slideshow-two.webp",
    "/assets/images/login-slideshow-three.webp"
];

const LoginSignup = () => {
    const paperStyle = { padding: 20, width: 600, margin: "0 auto", borderRadius: 20, position: 'relative', zIndex: 2 }
    const avatarStyle = { backgroundColor: '#253C7C' }
    const btnstyle = { margin: '8px 0', borderRadius: 5, height: 40 }

    const [currentImage, setCurrentImage] = useState(0);
    const [activeTab, setActiveTab] = useState(0);
    const [emailAddress, setEmailAddress] = useState([]);
    const [firstname, setFirstname] = useState([]);
    const [lastname, setLastname] = useState([]);
    const [password, setPassword] = useState([]);
    const [confirmPassword, setConfirmPassword] = useState([]);
    const [showMsg, setShowMsg] = useState(false);
    const [msg, setMsg] = useState('');
    const [severity, setSeverity] = useState('error')

    const { data: session } = useSession();
    const router = useRouter();
    const { callbackUrl } = router.query; // Capture the callbackUrl from the query

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage(currentImage => (currentImage + 1) % slideshowImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleChangeTab = (event, newValue) => {
        setActiveTab(newValue);
    };

    const addUser = async (user) => {
        try {
            const res = await fetch('http://localhost:3000/api/user',
                {
                    method: 'POST',
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({
                        'email_address': user.emailAddress,
                        'firstname': user.firstname,
                        'lastname': user.lastname,
                        'password': user.password,
                        'type': "Sign Up"
                    })
                });
            return await res.json();
        }
        catch (e) {
            throw e;
        }

    }

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            // Attempt to sign in
            const result = await signIn('credentials', {
                redirect: false, // Prevent NextAuth from redirecting
                emailAddress,
                password,
                'type': "Log In",
            });

            if (result.error) {
                // Handle error messages
                //throw new Error(`Failed to log in, Error: ${result.error}`);
                setMsg('Authentication Failed.')
                setShowMsg(true);
                return;
            }
            // Redirect to the secure page after sign in
            router.push(callbackUrl || '/');

        }
        catch (e) {
            throw e;
        }
    }

    const handleMsg = (msg) => {
        setMsg(msg);
        setShowMsg(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (password !== confirmPassword) {
                setSeverity('error');
                handleMsg('Password and confirm password should match!');
                return;
            }

            const data = await addUser({
                emailAddress: emailAddress,
                firstname: firstname,
                lastname: lastname,
                password: password,
            })


            if (data.error) {
                setSeverity('error');
                handleMsg(data.error);
            }
            else {
                setTimeout(() => {
                    setSeverity('success');
                    handleMsg('User successfully registered. Please login!');
                    setTimeout(() => {
                        //router.push('/client');
                        setActiveTab(0)
                    }, 1500);
                }, 500);
            }

        }
        catch (e) {
            throw e;
        }
    }

    const loginButtonOAuth = () => {
        if (session) {
            return (
                //for testing only
                <>
                    <p>Signed in as {session.user.email}</p>
                    <Button onClick={() => signOut()} color='primary' variant="contained" sx={{ backgroundColor: '#253C7C', borderRadius: '15px' }} style={btnstyle} fullWidth>Sign out</Button>
                </>
            );
        }
        else {
            return (
                <Button onClick={() => signIn('google', { callbackUrl: callbackUrl || '/' })} color='primary' variant="contained" sx={{ backgroundColor: '#253C7C', borderRadius: '15px' }} style={btnstyle} fullWidth>Sign in with Google</Button>
            );
        }
    }

    return (
        <>
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
                <div style={{ width: '100%', zIndex: 2, display: 'inline-grid', justifyContent: 'center', borderRadius: 20, overflow: 'hidden' }}>
                    <Image src={loginLogo} alt="Login Logo" width={650} height={160} layout='responsive' objectFit="contain" style={{ borderRadius: '20px' }} />
                </div>

                {/* Login & Signup Paper */}
                <Paper elevation={10} style={paperStyle} sx={{ boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.30)' }}>
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
                                backgroundColor: '#253C7C',
                                color: '#ffffff !important',
                                borderColor: '#253C7C',
                                zIndex: 1,
                                '&:not(:first-of-type)': {
                                    borderLeft: '1px solid #253C7C',
                                },
                                '&:not(:last-child)': {
                                    borderRight: '1px solid #253C7C',
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
                            <form onSubmit={loginUser}>
                                <TextField label='Email' placeholder='Enter email' variant="outlined" fullWidth required onChange={(e) => setEmailAddress(e.target.value)} sx={{ marginBottom: "10px" }} />
                                <TextField label='Password' placeholder='Enter password' type='password' variant="outlined" fullWidth required onChange={(e) => setPassword(e.target.value)} />
                                <Button type='submit' color='primary' variant="contained" sx={{ backgroundColor: '#253C7C', borderRadius: '15px' }} style={btnstyle} fullWidth>Sign in</Button>
                            </form>
                            <Typography>
                                <Link href="#">Forgot password?</Link>
                            </Typography>
                            <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
                                <span style={{ flexGrow: 1, height: '1px', backgroundColor: '#000' }}></span>
                                <span style={{ margin: '0 10px', fontWeight: 'bold', color: '#000' }}>or</span>
                                <span style={{ flexGrow: 1, height: '1px', backgroundColor: '#000' }}></span>
                            </div>
                            {/* <GoogleLogin
                                onSuccess={(credentialResponse) => {
                                    console.log(credentialResponse);
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                                theme='filled_blue'
                            /> */}

                            {loginButtonOAuth()}

                            <Typography style={{ paddingTop: '8px' }}> Do you have an account?
                                <Link href="#" onClick={() => setActiveTab(1)}>Sign Up</Link>
                            </Typography>
                        </Stack>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div role="tabpanel" hidden={activeTab !== 1} style={{ paddingTop: '30px' }}>
                            <Grid container direction="column" alignItems="center" justifyContent="center">
                                <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                                <Typography variant='h4' style={{ margin: '20px 0' }}>Sign up</Typography>
                            </Grid>
                            <Stack spacing={2}>
                                <TextField label='First Name' placeholder='Enter first name' variant="outlined" fullWidth required
                                    onChange={(e) => setFirstname(e.target.value)} />
                                <TextField label='Last Name' placeholder='Enter last name' variant="outlined" fullWidth required
                                    onChange={(e) => setLastname(e.target.value)} />
                                <TextField label='Email Address' placeholder='Enter email' variant="outlined" fullWidth required
                                    onChange={(e) => setEmailAddress(e.target.value)} />
                                <TextField label='Password' placeholder='Enter password' type='password' variant="outlined" fullWidth required onChange={(e) => setPassword(e.target.value)} />
                                <TextField label='Confirm Password' placeholder='Confirm password' type='password' variant="outlined" fullWidth required onChange={(e) => setConfirmPassword(e.target.value)} />
                                {/* <Link href={'/login/signup/'} > */}
                                <Button type='submit' color='primary' variant="contained" sx={{ backgroundColor: '#253C7C', borderRadius: '15px' }} style={{ btnstyle, paddingTop: '15px' }} fullWidth>Sign up</Button>
                                {/* </Link> */}
                                <Typography style={{ paddingTop: '15px' }}> Already have an account?
                                    <Link href="#" onClick={() => setActiveTab(0)}>Login</Link>
                                </Typography>
                            </Stack>
                        </div>
                    </form>
                </Paper>
            </Grid>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={showMsg}
                onClose={() => setShowMsg(false)}
                key={'topright'}
                TransitionComponent={(props) => <Slide {...props} direction="up" />}>
                <Alert

                    severity={severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {msg}
                </Alert>
            </Snackbar>
        </>
    );
};

export default LoginSignup;