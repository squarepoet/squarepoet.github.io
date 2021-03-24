import { blue, purple, red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// Create a theme instance.
const Theme = createMuiTheme({
    palette: {
        primary: {
            main: purple[700],
        },
        secondary: {
            main: blue[500],
        },
        error: {
            main: red.A400,
        },
        background: {
            default: "#232323",
        },
    },
});

export default Theme;
