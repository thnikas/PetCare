'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from 'next/image';
import ButtonSi from './ButtonSi';
import { SessionInterface, UserForm } from '@/common.types';
import { createUser } from '@/lib/actions';
import { useRouter } from 'next/navigation';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
    const router = useRouter()

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
            await createUser(form)

            router.push("/")
            router.refresh()

        
        
       

    } catch (error) {
        alert(`Failed to Create User. Try again!`);
        console.log(error)
    } 
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
  };
  const [form, setForm] = //the form that changes based on what the user has selected in the form
    React.useState({
        name:'JohnDoe',
         email:'',
         passwordHash:'',
         avatarUrl:'http://res.cloudinary.com/drtn6ynhu/image/upload/v1706560216/y9n7cqkh2jl6dh4ttat1.jpg',
         description:''

    })
    const handleStateChange = (fieldName: keyof UserForm, value:any) => {//the form update when a value is changed
        setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
    };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" className='pb-10'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Image src={'/icon.svg'} width={200} height={200} alt='icon'/>

        
          <Typography component="h1" variant="h5" className='font-medium text-4xl text-[#6171A3]'>
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={(e)=>handleStateChange('email', e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e)=>handleStateChange('passwordHash', e.target.value)}


            />
            
            <div className='justify-center flex'>
            <ButtonSi type='submit' customClass='SignInB'  title='Sign Up'  />

            </div>

            <Grid container className='justify-center pt-2 '>
            
              <Grid item >
                <Link href="/log-in" variant="body2" className='text-[#6171A3]'>
                  {"Have you already an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}