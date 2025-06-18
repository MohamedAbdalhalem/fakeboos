'use client'
import { Alert, Button, FormControl,  InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import  Box  from '@mui/material/Box';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios'




type registerForm = {
    
    name: string,
    email:string,
    password: string,
    rePassword: string,
    dateOfBirth: string | null,
    gender: string

}
export default function RegisterForm() {
  const { register, handleSubmit, formState: { errors }, watch,control } = useForm<registerForm>({
    defaultValues: {
      gender: ''
    }
  })
  const [islouding, setIsLouding] = useState(false)
  const [isError, setIsError] = useState<string | null>(null)
      const [isSuccess,setIsSuccess] = useState(false)
  function handleRegister(data: registerForm) {
    console.log(data)
      setIsLouding(true)
      axios.post('https://linked-posts.routemisr.com/users/signup', data)
        .then(() => {
          setIsSuccess(true)
              setTimeout(() => {
                setIsSuccess(false)
            }, 3000);
        }).catch(err => {
          setIsError(err.response.data.error)
            setTimeout(() => {
                setIsError(null)
            }, 3000);
        }).finally(() => {
          setIsLouding(false)
        })
    }
    
  return (
    <Box action='' component='form' onSubmit={handleSubmit(handleRegister)}>
      {isError && <Alert sx={{ mb: '16px' }} severity="error"> {isError} </Alert>}
      {isSuccess && <Alert sx={{ mb: '16px' }} severity='success' >
        Account created successfuly
                </Alert> }
          <TextField {...register('name', {
              required: 'required',
              minLength: {value:2,message:'minmum length is  2 charcter'}
          })}
              error={!!errors.name}
              helperText={errors.name?.message}
              className='w-full mb-4' id="name" label="Name" variant="outlined" />
          <TextField {...register('email', {
              required: 'required',
            pattern:{value:/^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,message:'in-valid email'}
          })}
              error={!!errors.email}
              helperText={errors.email?.message}
              className='w-full mb-4' id="email" label="Email" variant="outlined" />  
          <TextField type='password'
        {...register('password', {
          required: 'required',
                pattern:{value:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,message:'the password must contian a capital letter and spicial char and number and at least 8 char'}
               })}
              error={!!errors.password}
              helperText={errors.password?.message}
              className='w-full mb-4' id="password" label='password' variant="outlined" />
          
          <TextField type='password'
        {...register('rePassword', {
          required: 'required',
          validate : (value) => (  value === watch('password')   ||  'Passwords do not match' )
        })}
        
              error={!!errors.rePassword}
              helperText={errors.rePassword?.message}
              className='w-full mb-4' id="rePassword" label='rePassword' variant="outlined" />
          
          <TextField type='date'
              {...register('dateOfBirth', { required: 'required' })}
              error={!!errors.dateOfBirth}
              helperText={errors.dateOfBirth?.message}
              className='w-full mb-4' id="DateOfBirth" variant="outlined" />
        <FormControl fullWidth>
  <InputLabel id="gender-label">Gender</InputLabel>
                <Controller
    name="gender"
    control={control}
    defaultValue=""
    rules={{ required: 'required' }}
    render={({ field }) => (
      <Select
        labelId="gender-label"
        id="gender"
        label="Gender"
        error={!!errors.gender}
        {...field}
      >
        <MenuItem value="male">male</MenuItem>
        <MenuItem value="female">female</MenuItem>
      </Select>
    )}
  />
        {errors.gender && <Typography sx={{ color: '#D32F2F', fontSize: '12px', mt: '5px', ml: '18px', fontWeight: '400' }} component='p' variant='body1'>
          {errors.gender.message}
        </Typography>}
</FormControl>
      <Button type='submit' sx={{ width: '100%', fontWeight: 'bold', fontSize: 18, mt: '16px' }} variant="contained">
        {islouding ? 'Louding...' : 'Submit'}
        </Button>
      </Box>
  )
}
