import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({open, setOpen, handleSubmit, total}) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            handleSubmit(formJson)
            handleClose();
          },
        }}
      >
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you ready to confirm your selections?
          </DialogContentText>
          <TextField
            required
            margin="dense"
            id="name"
            name="full_name"
            label="Full Name"
            type="text"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            name="organization"
            label="Organization: (Optional)"
            type="text"
            fullWidth
          />
          <DialogActions>
          {/* <Button onClick={handleClose} className='!text-black'>Cancel</Button> */}
          <Button 
            type="submit" 
            className={'!flex !gap-2 !items-center !bg-[#b49c4f] !text-white !mx-auto !max-w-max !w-[200px] !h-[50px]'}
          >
            Accept <span className='font-bold'>{total ?? ""}</span>
          </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
