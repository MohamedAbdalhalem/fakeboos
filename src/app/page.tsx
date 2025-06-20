import { cookies } from 'next/headers'
import React from 'react'
import { postType, userDataType } from './types'
import { Box, Grid } from '@mui/material'
import Post from './_Components/Navbar/Post'
import PostCreation from './_Components/Navbar/PostCreation'
import { redirect } from 'next/navigation';

export default async function Home() {
  const myCookies = await cookies()
  const tokenValue = myCookies.get('tkn')?.value;
  if (!tokenValue) {
  redirect('/login');
}
  if (!tokenValue) {
  throw new Error("Token not found in cookies");
  }
  async function getAllPosts(){
    const res = await fetch('https://linked-posts.routemisr.com/posts?limit=20',{
      headers: { token: tokenValue! },
      cache:'force-cache'
    })
    const { posts } = await res.json()
    return posts 
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
  const posts : postType[]  = await getAllPosts()
  return (
    <Box component='section'>
      <Grid justifyContent='center' container >
        
        <Grid sx={{ m: '10px' }} size={{ xs: 12, md: 8 }}>
          <PostCreation/>
    {posts.map(post=> <Post userId={userData._id} key={post.id} postDetials={post}/>)}
  </Grid>
</Grid>
    </Box>
  )
}
