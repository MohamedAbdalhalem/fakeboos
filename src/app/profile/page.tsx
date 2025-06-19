import { cookies } from "next/headers"
import { userDataType } from "../types"
import { Box, Grid, Typography } from "@mui/material"
import Image from "next/image"
import UserPosts from "../_Components/Navbar/UserPosts"
import { redirect } from 'next/navigation'
export default async function Profile() {
  const myCookies = await cookies()
  const tokenValue = myCookies.get('tkn')?.value;
  if (!tokenValue) {
    redirect('/login');
  }
  if (!tokenValue) {
  throw new Error("Token not found in cookies");
  }
    async function getUserData() {
        const res = await fetch('https://linked-posts.routemisr.com/users/profile-data', {
            headers: { token: tokenValue! },
            cache:'force-cache'
            })
        const {user} = await res.json()
        return user
    }
    const userData : userDataType = await getUserData()
      return (
        <Box component='section'>
          <Grid container wrap='wrap' justifyContent="center">
                  <Grid sx={{ m: '10px',borderBottom:'1px solid #ccc' }} size={{ xs: 12, md: 8 }} >
                      <Image width={200} height={200} style={{margin: 'auto'}} src={userData.photo} alt='' />
                      <Typography sx={{
                          fontWeight: 'bold', mt: '15px', fontSize: '18px',
                          color:'#1976D2'
                       }} >Name :
                          <Typography component='span' sx={{ fontWeight: '700',color:'#000'  }} >    {userData.name}</Typography>
                      </Typography>
                      <Typography sx={{ fontWeight: '900',mt:'15px',fontSize:'18px',
                        color:'#1976D2'
                       }} >Email : 
                          <Typography component='span' sx={{fontWeight:'700',color:'#000'}} > { userData.email }</Typography>
                      </Typography>
                      <Typography sx={{ fontWeight: 'bold',mt:'15px',fontSize:'18px',
                        color:'#1976D2'
                       }} >DateOfBirth : 
                          <Typography component='span' sx={{fontWeight:'700',color:'#000'}} > { userData.dateOfBirth }</Typography>
                      </Typography>
                      <Typography sx={{ fontWeight: 'bold',mt:'15px',fontSize:'18px',
                        color:'#1976D2'
                       }} >Gender : 
                          <Typography component='span' sx={{fontWeight:'700',color:'#000'}} > { userData.gender }</Typography>
                      </Typography>
                  </Grid> 
                   <UserPosts userId={ userData._id }/>
          </Grid>
        </Box>
      )
    }
    