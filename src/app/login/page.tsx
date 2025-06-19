import { Typography } from '@mui/material'
import LoginForm from '../_Components/Navbar/LoginForm'
import { redirect } from 'next/navigation'
import { cookies } from "next/headers";

export default async function login() {
  const myCookies = await cookies()
    const tkn = myCookies.get('tkn')?.value
    if (tkn) {
      redirect('/')
    }
  return (
    <div className='max-w-lg mx-auto p-4'>
          <Typography className='text-center mb-4' component='h2' variant='h4'  >Login</Typography>
          <LoginForm/>
    </div>
  )
}
