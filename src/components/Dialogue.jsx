import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({open, setOpen, handleSubmit}) {

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
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
          />
          <div className='flex gap-2 md:gap-4'>
            <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="first_name"
                label="First Name"
                type="text"
                fullWidth
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="last_name"
              label="Last Name"
              type="text"
              fullWidth
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className='!text-black'>Cancel</Button>
          <Button type="submit" className={'!bg-[#b49c4f] !text-white'}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
