import { Typography } from '@mui/material'
import LoginForm from '../_Components/Navbar/LoginForm'


export default function login() {
  return (
    <div className='max-w-lg mx-auto p-4'>
          <Typography className='text-center mb-4' component='h2' variant='h4'  >Login</Typography>
          <LoginForm/>
    </div>
  )
}
