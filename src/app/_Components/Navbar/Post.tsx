'use client'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
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
import { TextField,Box, Button, CircularProgress } from '@mui/material';
import myCookies from 'js-cookie'
import axios from 'axios';
import { useRouter } from 'next/navigation';
export default function Post({postDetials,userId} : {postDetials: postType,userId : string}) {
  const [expanded, setExpanded] = React.useState(false);
  const router = useRouter()
  const commentRef = React.useRef<HTMLInputElement>(null)
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [isOpen, setIsOpen] = React.useState(false)
  const [isLouding1,setIsLouding1] = React.useState(false)
  const [isLouding2,setIsLouding2] = React.useState(false)
  const [isLouding3,setIsLouding3] = React.useState(false)
  function isUserPost(){
    if (postDetials.user._id === userId) {
      return true
    }
  }
  function handleDeletePost() {
    setIsLouding1(true)
    axios.delete(`https://linked-posts.routemisr.com/posts/${postDetials.id}`, {
      headers:{token : myCookies.get('tkn')}
    }).then(()=>{
      router.refresh()
    }).catch(err => {
       console.log(err)
    }).finally(() => {
      setIsLouding1(true)
    })
  }
  function createComment() {
    const commentValue = commentRef.current?.value
    const data = {
    content: commentValue,
    post: postDetials.id
    }
    setIsLouding2(true)
    axios.post('https://linked-posts.routemisr.com/comments', data, {
      headers:{token : myCookies.get('tkn')}
    }).then(()=>{
      router.refresh()
      if (commentRef.current) {
        commentRef.current.value = '';
      }
    }).catch(err=>{
      console.log(err)
    }).finally(() => {
      setIsLouding2(false)
    })
  }
  function handleDeleteComment(id : string) {
    setIsLouding3(true)
    axios.delete(`https://linked-posts.routemisr.com/comments/${id}`, {
      headers:{token : myCookies.get('tkn')}
    }).then(() => {
      router.refresh()
    }).catch(err=>{
      console.log(err)
    }).finally(() => {
      setIsLouding3(false)
    })
  }
  return (
    <Card  sx={{mb:'20px',position:'relative'}} >
      <CardHeader
        avatar={
          <Avatar  sx={{ bgcolor: '#1976D2',position:'relative' }} aria-label="recipe">
            <Image fill src={postDetials.user.photo} alt='' />
          </Avatar>
        }
        action={
          isUserPost() && <IconButton onClick={()=> setIsOpen(!isOpen)} aria-label="settings">
            <MoreVertIcon  />
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
              <IconButton onClick={handleExpandClick}>
  <CommentIcon />
</IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{maxHeight:`${postDetials.comments.length ? '200px' : '50px'}` , overflowY:'scroll',borderTop:'1px solid #ccc'}}>
                  {postDetials.comments.length ? postDetials.comments.map(comment => <CardHeader
              key={comment._id}
        avatar={
          <Avatar sx={{ bgcolor: '#1976D2' }} aria-label="recipe">
                {!comment.commentCreator.photo ? <Image width={30} height={30} src={comment.commentCreator.photo } alt='' /> : <AccountCircleIcon/>}
          </Avatar>
        }
        action={
          isUserPost() && <IconButton onClick={()=> handleDeleteComment(comment._id)} aria-label="settings">
            {isLouding3 ? <CircularProgress size="20px" color='error' /> : <DeleteIcon color='error'/>}
          </IconButton>
        }
        title={comment.commentCreator.name}
        subheader={comment.content}
          />) : 'No Comments Yet'}
              </CardContent>
              <Box sx={{p:'5px', display:'flex', justifyContent:'space-between', borderTop:'1px solid #ccc'}}>
                  <TextField inputRef={commentRef} id="outlined-basic" placeholder='write a comment with atleast 2 char' sx={{width:'90%'}} />
          <Button onClick={createComment} variant="contained" sx={{ width: '8%' }} >
            {isLouding2 ? <CircularProgress color='success' /> : <SendIcon/>}
          </Button>
           </Box>
      </Collapse>
      {isOpen && <Box zIndex={5} component='div' sx={{position:"absolute",top:'25px',p:'5px',borderRadius:'5px',right:'50px',boxShadow:"0px 0px 5px 0px rgba(0,0,0,0.75);"}}>
        <Typography onClick={handleDeletePost} sx={{ textAlign: 'center', mb: '5px', cursor: 'pointer' }}>
          {isLouding1 ? 'Deleting...' : 'Delete'}
        </Typography>
        {/* <Typography sx={{textAlign:'center',cursor:'pointer'}}>Edit</Typography> */}
      </Box>}
    </Card>
  );
}
