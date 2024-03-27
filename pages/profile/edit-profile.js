import { Container, Typography, TextField, Button, Paper, Stack, Box, Accordion, AccordionSummary, AccordionDetails,Radio, FormControlLabel } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import React, { useState, useEffect, } from 'react';
import { useRouter } from 'next/router';

export default function Profile() {
  const [userEmail, setUserEmail] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const getUserData = () => {
      if (window === undefined)
          return () => {};
      (async () => {
  
          const res = await fetch('http://localhost:3000/api/user', {
              method: 'GET',
              headers: {
                  "Content-type": "application/json"
              },
          });
          const categoriesData = await res.json();
          let profileInfo = null;
          for (const user of categoriesData) {
              if (user.email_address == window.localStorage.getItem("userEmail")) {
                  profileInfo = user;
                  break;
              }
          }
          if (profileInfo == null) {
              router.push("/login");
              return;
          }
          setUserEmail(profileInfo.email_address);
          setUserFirstName(profileInfo.firstname);
          setUserLastName(profileInfo.lastname);
          setPassword(profileInfo.password);
          setConfirmPassword(profileInfo.password);
          setUserId(profileInfo._id)
          console.log(profileInfo)
      })();
      return () => {};
  }
  useEffect(getUserData, []);
  const onApprove = () => {
    if (password != confirmPassword){
      return;
    }
    (async () => {
  
      const res = await fetch('http://localhost:3000/api/user?' + new URLSearchParams({id: userId}),{
        method: 'PUT',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          email_address: userEmail,
          firstname: userFirstName,
          lastname:  userLastName,
          password: password,
        })
      });
    })();
  };
  
    const paperStyle = {
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0px 3px 15px rgba(0,0,0,0.2)',
      };
    return(
    <Box
      sx={{
        mx: 'auto', 
        mt: 'auto', 
      }}
    >
        <h1 style={{ textAlign: 'left', margin: '1.5rem 0', }}>My Profile</h1>
        <Paper style={paperStyle}
            sx={{
              maxWidth: '50%',
              mx: 'auto',
              mt: 'auto',
            }}>
                <Box sx={{display:'flex',justifyContent:'center'}}>
                <Avatar src="" sx={{ width: 150, height: 150}} />
                </Box>
                <Box sx={{display:'flex',justifyContent:'center'}}>
                <Typography variant="p" color="black">Change Picture</Typography></Box>

                <Typography variant="h6" fontWeight="bold" color="black">First Name</Typography>
                <TextField
                required
                id="outlined-required"
                value={userFirstName}
                onChange={e => setUserFirstName(e.target.value)}
                fullWidth
                margin="normal"
                />

                <Typography variant="h6" fontWeight="bold" color="black">Last Name</Typography>
                <TextField
                required
                id="outlined-required"
                value={userLastName}
                onChange={e => setUserLastName(e.target.value)}
                fullWidth
                margin="normal"
                />

                <Typography variant="h6" fontWeight="bold" color="black">Email</Typography>
                <TextField
                required
                id="outlined-required"
                value={userEmail}
                onChange={e => setUserEmail(e.target.value)}
                fullWidth
                margin="normal"
                />

                <Typography variant="h6" fontWeight="bold" color="black">Password</Typography>
                <TextField
                id="outlined-password-input"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                fullWidth
                margin="normal"
                />

                <Typography variant="h6" fontWeight="bold" color="black">Confirm Password</Typography>
                <TextField
                id="outlined-password-input"
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                fullWidth
                margin="normal"
                />
                
    <Box sx={{display:'flex',justifyContent:'center'}}>      
      <Button onClick={onApprove} variant="outlined" sx={{bgcolor:'#253C7C',color: 'white'}}>
        Approve
      </Button></Box>
        </Paper>
    </Box>
    );
}