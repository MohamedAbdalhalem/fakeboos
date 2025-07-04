import { Grid, Typography } from '@mui/material'
import { postType, userDataType } from '_/app/types'
import { cookies } from 'next/headers'
import React from 'react'
import PostCreation from './PostCreation'
import Post from './Post'

export default async function UserPosts({ userId }: { userId: string }) {
  const myCookies = await cookies()
  const tokenValue = myCookies.get('tkn')?.value;
  if (!tokenValue) {
  throw new Error("Token not found in cookies");
  }

  async function getUserPosts() {
    const res= await fetch(`https://linked-posts.routemisr.com/users/${userId}/posts`, {
      headers: { token: tokenValue! }
    })
    const {posts} = await res.json()
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
  const userPosts :postType[] = await getUserPosts()
  return (
<Grid sx={{ m: '10px' }} size={{ xs: 12,md:8 }}>
          <PostCreation/>
      {userPosts.length ? userPosts.map(post => <Post userId={userData._id} key={post.id} postDetials={post} />)
    : <Typography component='h4' variant='h4' textAlign='center' >No Posts Yet</Typography>}
  </Grid>
  )
}
