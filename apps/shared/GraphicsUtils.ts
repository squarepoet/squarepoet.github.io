namespace GraphicsUtils {
    // e.g., FE03BC => 0xFE, 0x03, 0xBC
    export const getRGBFromHexString = (hex: string) => {
        let r = 0;
        let g = 0;
        let b = 0;
        if (hex.length === 6) {
            r = parseInt("0x" + hex.substring(0, 2));
            g = parseInt("0x" + hex.substring(2, 4));
            b = parseInt("0x" + hex.substring(4, 6));
        } else if (hex.length === 3) {
            r = parseInt("0x" + hex.charAt(0) + hex.charAt(0));
            g = parseInt("0x" + hex.charAt(1) + hex.charAt(1));
            b = parseInt("0x" + hex.charAt(2) + hex.charAt(2));
        } else {
            throw "Cannot parse the hex color string.";
        }
        return { r: r, g: g, b: b };
    };
}

// #TODO: Figure out how to export all functions from a namespace more cleanly.
// This allows the user of the module to pick and choose which functions to import.
const getRGBFromHexString = GraphicsUtils.getRGBFromHexString;
export { getRGBFromHexString };

// The user can alternatively import the entire namespace.
export default GraphicsUtils;
