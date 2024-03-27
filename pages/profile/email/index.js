import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import RTextEditor from '@/components/RTextEditor';
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { Alert, Slide, Snackbar } from '@mui/material';

const protocol = process.env.VERCEL_ENV === 'production' ? 'https' : 'http';
const baseURL = process.env.VERCEL_URL ? `${protocol}://${process.env.VERCEL_URL}` : `${protocol}://localhost:3000`;
const apiRoute = `${baseURL}/api/user`;

// Import 'react-quill' dynamically without SSR
const QuillEditor = dynamic(() => import('react-quill'), {
  ssr: false,
});

export async function getServerSideProps(context) {
  let usersData = [{}];
  const session = await getSession({ req: context.req }); // Use getSession to get the session

  try {
    const res = await fetch(`${apiRoute}?id=${encodeURIComponent(session.user.id)}`, { cache: "no-store" });

    if (!res.ok) {
      throw new Error('Failed to fetch users');
    }
    usersData = await res.json();

  }
  catch (error) {
    console.log('Error loading users', error);
  }
  return { props: { usersData } };
}

export default function Email({ usersData }) {
  const [content, setContent] = useState(usersData.email_template);
  const [showMsg, setShowMsg] = useState('');
  const [msg, setMsg] = useState('');
  const [severity, setSeverity] = useState('error')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

  const handleMsg = (msg) => {
    setMsg(msg);
    setShowMsg(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    //call api for put
    const res = await fetch(apiRoute, {
      method: 'PUT',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        id: usersData._id,
        updateFields: { 'email_template': content },
      })
    });

    if (res.ok) {
      //redirect
      setTimeout(() => {
        setSeverity('success');
        handleMsg('Email template has been saved');
        setTimeout(() => {
          setIsLoading(false);
          router.push(`/`)
        }, 1500);
      }, 500);

    }
  };

  const paperStyle = {
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0px 5px 10px rgba(0,0,0,0.30)', // Adjust the shadow to match your design
  };

  return (
    <Box
      sx={{
        mx: 'auto',
        mt: 'auto',
      }}
    >
      <form onSubmit={handleSubmit} >
        <h1 style={{ textAlign: 'left', margin: '1.5rem 0', }}>My Email</h1>
        <Paper elevation={3} style={paperStyle}
          sx={{
            maxWidth: '80vw',
            mx: 'auto',
            mt: 'auto',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.30)'
          }}>
          <h2 style={{ textAlign: 'left' }}>Customize Message</h2>

          <Box sx={{ height: '50vh' }}><RTextEditor props={{ setContent, content }} /></Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: '3rem' }}>
            <button
              style={{ padding: '1rem 1.5rem', borderRadius: '5px', border: 'none', backgroundColor: '#253C7C', borderRadius: '15px', color: 'white', cursor: 'pointer' }}>
              Save
            </button>
          </Box>
        </Paper>
      </form>
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
    </Box>
  );
}