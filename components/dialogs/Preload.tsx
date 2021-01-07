import Piano from "apps/shared/sound/Piano";
import React, { KeyboardEvent, useEffect, useState } from "react";
import { useEventListener } from "use-hooks";

import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from "@material-ui/core";

// A modal dialog that forces the user to interact so we can start Web Audio and preload any samples.
const PreloadDialog = (props) => {
    let { initialOpenState, preloadNow } = props;
    const [open, setOpen] = useState(initialOpenState);

    const handleDialogClose = (event: object, reason: string) => {
        setOpen(false);
    };

    const onButtonClick = (event: object) => {
        console.log("onButtonClick");
        handleDialogClose(null, "buttonClicked");
    };

    if (typeof window !== "undefined") {
        useEventListener("keydown", (e: KeyboardEvent) => {
            handleDialogClose(null, "keyboardPressed");
            console.log("KD");
        });
    }

    useEffect(() => {
        console.log("MOUNT");
        return () => {
            console.log("UNMOUNT");
        };
    }, []);

    return (
        <div>
            <Dialog onClose={handleDialogClose} aria-labelledby="dialog-title" aria-describedby="dialog-description" open={open} onExited={preloadNow}>
                <DialogTitle id="dialog-title">Let's Make Music</DialogTitle>
                <DialogContent>
                    <DialogContentText id="dialog-description">This is going to be fun!</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={onButtonClick}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PreloadDialog;
