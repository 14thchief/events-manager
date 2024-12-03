import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({open, setOpen, error, setError, handleSubmit, total}) {
  const [termsAgreed, setTermsAgreed] = React.useState(false);

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
            console.log({termsAgreed})
            if (termsAgreed) {
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              handleSubmit(formJson)
            } else {
              setError("Please agree to the terms and conditions before submitting.")
            }
          },
        }}
      >
        <DialogTitle>Accept</DialogTitle>
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
            id="phone"
            name="contact_number"
            label="Contact Number"
            type="phone"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="company"
            name="company"
            label="Company"
            type="text"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="ben"
            name="billing_entity_name"
            label="Billing Entity Name"
            type="text"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="bee"
            name="billing_entity_address"
            label="Billing Entity Address"
            type="text"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="bee"
            name="billing_entity_email"
            label="Billing Entity Email"
            type="email"
            fullWidth
          />
          {error && <small className='text-red-500 my-2'>{error}</small>}
          <div className='flex items-center gap-4 my-4'>
            <div 
              type="checkbox" 
              name={"terms"} 
              onClick={()=> setTermsAgreed(prev=> !prev)}
              className={`rounded border h-5 w-5 ${termsAgreed? 'bg-[#b49c4f]' : 'bg-gray-200'}`}
            />
            <p className='bg-gray-200 text-black p-4 flex-1'>By selecting a hospitality event, you acknowledge and agree that payment will be invoiced in GBP and is due within 15 days of receipt. Payments are non-refundable unless the event is cancelled by the organizer. For more information on how we handle your data, please review our Privacy Policy.
            </p>
          </div>
          <DialogActions>
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
