'use client'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useRef, useState } from 'react';
import { TextField, Typography } from '@mui/material';
import  myCoojies from 'js-cookie'
import { useRouter } from 'next/navigation';
import axios from 'axios';
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

export default function ImageCreation() {
    const [open, setOpen] = useState(false);
    const imageInputRef = useRef<HTMLInputElement>(null)
    const [isLouding,setIsLouding] = useState(false)
    const router = useRouter()
    const handleOpen = () =>  setOpen(true)
    const handleClose = () => setOpen(false);
    function handleUpdatePhoto() {
        const img = imageInputRef.current?.files?.[0]
        const data = new FormData()
        if (img) {
            data.append('photo',img)
        }
        setIsLouding(true)
        axios.put('https://linked-posts.routemisr.com/users/upload-photo', data, {
            headers: {token: myCoojies.get('tkn')}
        }).then(() =>{
            router.refresh()
            handleClose()
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setIsLouding(false)
        })
    }
  return (
    <div className='mb-4'>
      <Typography fontWeight={'800'} onClick={handleOpen} textAlign='center' color='primary' sx={{cursor:'pointer'}} >Update Your profile Photo</Typography>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
                  <Typography component="h4" variant='h4' sx={{ textAlign: 'center', mb: '10px' }}>Update your Photo</Typography>
                  <TextField inputRef={imageInputRef}  type='file' fullWidth  sx={{mb:'10px'}}/>
          <Button onClick={handleUpdatePhoto} fullWidth variant="contained" >
            {isLouding ? 'Uplouding' : 'Save'}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}