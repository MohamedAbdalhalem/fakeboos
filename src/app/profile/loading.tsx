import { Box, Grid, Skeleton } from '@mui/material'
import React from 'react'

export default function loading() {
  return (
    <Box component='section'>
          <Grid container wrap='wrap' justifyContent="center">
              <Grid sx={{ m: '10px', borderBottom: '1px solid #ccc' }} size={{ xs: 12, md: 8 }} >
                  <Skeleton sx={{mx:'auto'}} variant="circular" width={200} height={200} />
                  <Skeleton sx={{mt:'15px'}} animation="wave" />
                  <Skeleton sx={{mt:'15px'}} animation="wave" />
                  <Skeleton sx={{mt:'15px'}} animation="wave" />
                  <Skeleton sx={{mt:'15px'}} animation="wave" />
                  </Grid>
                      
          </Grid>
        </Box>
  )
}
