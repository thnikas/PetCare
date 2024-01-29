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
import { UserForm } from '@/common.types';
import { getUserByEmail } from '@/lib/actions';
import { useGlobalContext } from '@/app/context';
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

export default function Login() {
  const {setLogUser} = useGlobalContext()
  const router = useRouter()

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(form.email==''){
      alert(`Please enter an email!`);
      return
    }else if(form.passwordHash==''){
      alert(`Please enter a password!`);
      return
    }
    const userExist = await getUserByEmail(form.email)
    console.log(userExist)
    if(userExist?.mongoDB.user!==null){
      console.log(userExist?.mongoDB.passwordHash)
      if(userExist?.mongoDB.user.passwordHash==form.passwordHash){
        setLogUser(userExist)
        router.push("/")

      }else{
        alert("The password is wrong. Please try again!")

      }
    }else {
      alert("There is not this e-mail. Please try with another one")
    }
  };
  const [form, setForm] = //the form that changes based on what the user has selected in the form
    React.useState({
         email:'',
         passwordHash:''
    })
    const handleStateChange = (fieldName: keyof UserForm, value:any) => {//the form update when a value is changed
      setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
  };
  return (
    <ThemeProvider theme={defaultTheme} >
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={(e)=>handleStateChange('email',e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e)=>handleStateChange('passwordHash',e.target.value)}

            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <div className='justify-center flex'>
            <ButtonSi customClass='SignInB'  title='Sign In' type='submit' />

            </div>

            <Grid container className='justify-center pt-2 '>
            
              <Grid item >
                <Link href="/sign-up" variant="body2" className='text-[#6171A3]'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}