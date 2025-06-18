import { Box, Grid } from '@mui/material'
import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import Skeleton from '@mui/material/Skeleton';
interface MediaProps {
  loading?: boolean;
}
export default function loading(props: MediaProps) {
  return (
    <Box component='section'>
      <Grid container justifyContent='center'  >
        <Grid sx={{ mt: '10px' }} size={{ xs: 12, md: 8 }}>
          <Card sx={{ mb: '20px' }}>
      <CardHeader
        avatar={
          <Skeleton animation="wave" variant="circular" width={40} height={40} />
        }
       
        title={
          <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
        }
        subheader={
          <Skeleton animation="wave" height={10} width="40%" />
        }
      />
       <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      <CardContent>
        <React.Fragment>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment> 
      </CardContent>
          </Card>
          <Card sx={{ mb: '20px' }}>
      <CardHeader
        avatar={
          <Skeleton animation="wave" variant="circular" width={40} height={40} />
        }
       
        title={
          <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
        }
        subheader={
          <Skeleton animation="wave" height={10} width="40%" />
        }
      />
       <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      <CardContent>
        <React.Fragment>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment> 
      </CardContent>
          </Card>
          
        </Grid>
      </Grid >
    </Box>
  )
}
