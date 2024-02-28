import React from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Stack } from '@mui/material';
import Image from 'next/image';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import loginLogo from "../public/assets/images/login_head.png";
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
    const paperStyle = { padding: 50, height: '60vh', width: '60%', margin: "20px auto", borderRadius: 20 }
    const avatarStyle = { backgroundColor: '#1bbd7e', margin:30 }
    const btnstyle = { margin: '8px 0', borderRadius:5, height: 40 }

    return (
        <Grid>
            <Grid align="center" style={{ position: 'relative', width: '100%', height: '200px' }}>
                <Image src={loginLogo} alt="logo" layout="fill" objectFit="contain" />
            </Grid>
            <Paper elevation={24} style={paperStyle} square={false}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <Typography variant='h4'>Login to get started</Typography>
                </Grid>

                <Stack spacing={4}>
                    <Stack>
                        <TextField label='Username' placeholder='Enter username'
                            variant="outlined" fullWidth required margin='dense' />
                        <TextField label='Password' placeholder='Enter password' type='password'
                            variant="outlined" fullWidth required margin='dense' />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label="Remember me"
                        />
                    </Stack>

                    <Stack>
                        <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth size='large' sx={{ my: 20 }} >Sign in</Button>
                        <Typography >
                            <Link href="#" >
                                Forgot password ?
                            </Link>
                        </Typography>
                    </Stack>
                    <Typography variant='h4' alignSelf={'center'}>or</Typography>
                    <Stack spacing={3}>
                        <GoogleLogin
                            onSuccess={(credentialResponse) => {
                                console.log(credentialResponse);
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                            theme='filled_blue'>
                        </GoogleLogin>
                        <Typography alignSelf={'center'}> Do you have an account ?
                            <Link href="#" >
                                Sign Up
                            </Link>
                        </Typography>
                    </Stack>
                </Stack>

            </Paper>
        </Grid>
    )
}

export default Login