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
    <DialogTitle>Accept</DialogTitle>
    <DialogContent>
        <DialogContentText>
        Submitted Successfully
        </DialogContentText>
        <DialogActions>
        {/* <Button onClick={handleClose} className='!text-black'>Cancel</Button> */}
        <Button 
        type="submit" 
        className={'!flex !gap-2 !items-center !bg-[#b49c4f] !text-white !mx-auto !max-w-max !w-[200px] !h-[50px]'}
        >
        Okay
        </Button>
        </DialogActions>
    </DialogContent>
    </Dialog>
</React.Fragment>