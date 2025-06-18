import { Typography } from "@mui/material";
import RegisterForm from "../_Components/Navbar/RegisterForm";


export default function Register() {
 
  return (
    <div className='max-w-lg mx-auto p-4'>
      <Typography className='text-center mb-4' component='h2' variant='h4'  >Register</Typography>
      <RegisterForm />
    </div>
  )
}
