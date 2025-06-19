'use client'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useRef, useState } from 'react';
import { TextField, Typography } from '@mui/material';
import   axios   from 'axios';
import  myCoojies from 'js-cookie'
import { useRouter } from 'next/navigation';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
 transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  width:'75%',
};

export default function PostCreation() {
    const [open, setOpen] = useState(false);
  const myRef = useRef<HTMLInputElement>(null)
  const textRef= useRef<HTMLInputElement>(null)
  const imgRef = useRef<HTMLInputElement>(null)
  const [isLouding,setIsLouding] = useState(false)
  const router = useRouter()
    const handleOpen = () => {
        setOpen(true)
        myRef.current?.blur()
    };
  const handleClose = () => setOpen(false);
  function getdata(){
    const text = textRef.current?.value 
    const img = imgRef.current?.files?.[0]
    const data = new FormData()
    if(text){
      data.append('body', text)
    }
    if (img) {
      data.append('image',img)
    }
    setIsLouding(true)
    axios.post('https://linked-posts.routemisr.com/posts', data, {
      headers:{ token: myCoojies.get('tkn') }
    }).then(()=>{
      router.refresh()
      handleClose()
    }).catch(err=>{
      console.log(err)
    }).finally( ()=>{
      setIsLouding(false)
    })
  }
  return (
    <div className='mb-4'>
      <TextField inputRef={myRef} onFocus={handleOpen}  type='text' placeholder='create a post' fullWidth />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography component="h4" variant='h4' sx={{textAlign:'center',mb:'10px'}}>Make Your Post</Typography>
          <TextField inputRef={textRef} type='text' fullWidth placeholder="What's on your mind?" sx={{mb:'10px'}} />
          <TextField inputRef={imgRef} type='file' fullWidth  sx={{mb:'10px'}}/>
          <Button onClick={getdata} type='submit' fullWidth variant="contained" >{
            isLouding ? 'Creating...' : 'Post'
          }</Button>
        </Box>
      </Modal>
    </div>
  );
}