// Test Material UI
import React from "react";

import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from "@material-ui/core";

function SimpleDialog(props) {
    const { onClose, open } = props; // destructure assignment of onClose/open props

    const handleDialogClose = (event: object, reason: string) => {
        console.log(`Dialog Closed: [${reason}]`);
        onClose();
    };
    const onButtonClick = (event: object) => {
        handleDialogClose(null, "buttonClicked");
    };

    return (
        <div>
            <Dialog onClose={handleDialogClose} open={open}>
                <DialogTitle id="dialog-title">My Title</DialogTitle>
                <DialogContent>
                    <DialogContentText id="dialog-description">Some awesome content!</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onButtonClick} color="primary">
                        OK!
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const Page = () => {
    const [open, setOpen] = React.useState(false);

    const onClickButton_Open = () => {
        setOpen(true);
    };

    const onClickButton2 = () => {
        console.log("Button 2 Clicked");
    };

    const onClickButton_Close = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="contained" color="primary" onClick={onClickButton_Open}>
                Open Dialog
            </Button>
            <br />
            <br />
            <Button variant="outlined" color="secondary" onClick={onClickButton2}>
                Secondary
            </Button>
            <br />
            <br />
            <SimpleDialog onClose={onClickButton_Close} open={open} />
        </>
    );
};

export default Page;
