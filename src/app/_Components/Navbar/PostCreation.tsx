'use client'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useRef, useState } from 'react';
import { TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
transform: 'translate(-50%, -50%)',
    width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function PostCreation() {
    const [open, setOpen] = useState(false);
    const myRef= useRef<HTMLInputElement>(null)
    const handleOpen = () => {
        setOpen(true)
        myRef.current?.blur()
    };
  const handleClose = () => setOpen(false);

  return (
    <div className='mb-4'>
      <TextField inputRef={myRef} onFocus={handleOpen}  type='text' placeholder='create a post' fullWidth />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component='form' sx={style}>
          <TextField type='text' fullWidth placeholder='post text' sx={{mb:'10px'}} />
                  <TextField type='file' fullWidth  sx={{mb:'10px'}}/>
                  <Button type='submit' fullWidth variant="contained" >Post</Button>
        </Box>
      </Modal>
    </div>
  );
}