'use client'
import { Alert, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import  Box  from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import axios from 'axios'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import cookies from 'js-cookie'
import { useRouter } from 'next/navigation';


type loginForm = {
    email:string,
    password: string
}

export default function LoginForm() {
  
    const router = useRouter();
    const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
    
    const { register, handleSubmit, formState: { errors } } = useForm<loginForm>()
    const [islouding, setIsLouding] = useState(false)
    const [isError, setIsError] = useState<string | null>(null)
    const [isSuccess,setIsSuccess] = useState(false)
    function handleLogin(data: loginForm) {
        setIsLouding(true)
      axios.post<{token : string}>('https://linked-posts.routemisr.com/users/signin', data)
        .then(data => {
          cookies.set('tkn', data.data.token)
              setIsSuccess(true)
              setTimeout(() => {
                setIsSuccess(false)
                router.push('/')
            }, 3000);
        }).catch(err =>{
            setIsError(err.response.data.error)
            setTimeout(() => {
                setIsError(null)
            }, 3000);
        }).finally(() => {
              setIsLouding(false)
          })
    }
    
  return (
      <Box component='form' onSubmit={handleSubmit(handleLogin)}>
          {isError && <Alert sx={{ mb: '16px' }} severity="error"> {isError} </Alert>}
          { isSuccess && <Alert sx={{mb:'16px'}} severity='success' >Welcome baby</Alert> }
          <TextField {...register('email', {
              required: 'required',
            pattern:{value:/^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,message:'in-valid email'}
          })}
              error={!!errors.email}
              helperText={errors.email?.message}
              className='w-full mb-4' id="email" label="Email" variant="outlined" />  
          
          <FormControl sx={{  width: '100%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
          required: 'required',
                pattern:{value:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,message:'the password must contian a capital letter and spicial char and number and at least 8 char'}
               })}
                  error={!!errors.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          </FormControl>
          {errors.password && <Typography sx={{ color: '#D32F2F', fontSize: '12px', mt: '5px', ml: '18px', fontWeight: '400' }} component='p' variant='body1'>
              {errors.password.message}
          </Typography>}
          <Button type='submit' sx={{ width: '100%', fontWeight: 'bold', fontSize: 18, mt: '16px' }} variant="contained">
              {islouding ? 'Louding...' : 'Submit'}
        </Button>
      </Box>
  )
}
