'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import { postType } from '../../types';
import Image from 'next/image';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';

import { TextField,Box, Button } from '@mui/material';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand,  ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

export default function Post({postDetials} : {postDetials: postType}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{mb:'20px'}} >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#1976D2' }} aria-label="recipe">
            <Image width={30} height={30} src={postDetials.user.photo} alt='' />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={postDetials.user.name}
        subheader={postDetials.createdAt}
          />
          <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {postDetials.body}
        </Typography>
      </CardContent>
      {!!postDetials.image && <CardMedia
              component="img"
              sx={{height:'300px'}}
        image={postDetials.image}
        alt="Paella dish"
      />}
      
      <CardActions sx={{display:'flex', justifyContent:"space-between"}}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
              </IconButton>
              <ExpandMore
          expand={false}
          onClick={handleExpandClick}
        >
          <CommentIcon />
        </ExpandMore>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{height:`${postDetials.comments.length ? '200px' : '50px'}` , overflowY:'scroll',borderTop:'1px solid #ccc'}}>
                  {postDetials.comments.length ? postDetials.comments.map(comment => <CardHeader
              key={comment._id}
        avatar={
          <Avatar sx={{ bgcolor: '#1976D2' }} aria-label="recipe">
                {!comment.commentCreator.photo ? <Image width={30} height={30} src={comment.commentCreator.photo } alt='' /> : <AccountCircleIcon/>}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <DeleteIcon />
          </IconButton>
        }
        title={comment.commentCreator.name}
        subheader={comment.content}
          />) : 'No Comments Yet'}
              </CardContent>
              <Box component='form' sx={{p:'5px', display:'flex', justifyContent:'space-between', borderTop:'1px solid #ccc'}}>
                  <TextField id="outlined-basic" placeholder='write a comment' sx={{width:'90%'}} />
                  <Button variant="contained" sx={{width:'8%'}} ><SendIcon/></Button>
              </Box>
      </Collapse>
    </Card>
  );
}
