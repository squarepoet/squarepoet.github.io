import { getRGBFromHexString } from "apps/shared/GraphicsUtils";
import LUMIKeys from "apps/shared/midi/LUMIKeys";
import ClearBoth from "components/ClearBoth";
import InputSaved, { InputSavedInterface } from "components/InputSaved";
import React, { useRef } from "react";

const UserColors = () => {
    const lumiRootKeyColorInput = useRef<InputSavedInterface>();
    const lumiGlobalKeyColorInput = useRef<InputSavedInterface>();

    const onRootKeyColorChanged = (val: string) => {
        try {
            const rgb = getRGBFromHexString(val);
            LUMIKeys.setColorRootKey("rgb", rgb.r, rgb.g, rgb.b);
        } catch (e) {
            // DO NOTHING IF WE CANNOT PARSE THE COLOR STRING
        }
    };

    const onGlobalKeyColorChanged = (val: string) => {
        try {
            const rgb = getRGBFromHexString(val);
            LUMIKeys.setColorGlobalKey("rgb", rgb.r, rgb.g, rgb.b);
        } catch (e) {
            // DO NOTHING IF WE CANNOT PARSE THE COLOR STRING
        }
    };

    return (
        <>
            <div style={{ border: "1px solid gray", padding: "5px 10px 10px 10px" }}>
                <div>User Colors</div>
                <div style={{ fontSize: "14px" }}>Only visible when you choose "user" in one of the modes above.</div>
                <div style={{ float: "left", marginRight: "40px" }}>
                    <div>Root Key</div>
                    <div>
                        <div className="colorSwatch" style={{ backgroundColor: "#0000FF" }} onClick={LUMIKeys.getClickHandler_SetColorRootKey("rgb", 0x00, 0x00, 0xff)}></div>
                        <div className="colorSwatch" style={{ backgroundColor: "#00FF00" }} onClick={LUMIKeys.getClickHandler_SetColorRootKey("rgb", 0x00, 0xff, 0x00)}></div>
                        <div className="colorSwatch" style={{ backgroundColor: "#FF0000" }} onClick={LUMIKeys.getClickHandler_SetColorRootKey("rgb", 0xff, 0x00, 0x00)}></div>
                        <div className="colorSwatch" style={{ backgroundColor: "#FFFF00" }} onClick={LUMIKeys.getClickHandler_SetColorRootKey("rgb", 0xff, 0xff, 0x00)}></div>
                        <div className="colorSwatch" style={{ backgroundColor: "#FF00FF" }} onClick={LUMIKeys.getClickHandler_SetColorRootKey("rgb", 0xff, 0x00, 0xff)}></div>
                        <div className="colorSwatch" style={{ backgroundColor: "#00FFFF" }} onClick={LUMIKeys.getClickHandler_SetColorRootKey("rgb", 0x00, 0xff, 0xff)}></div>
                        <div className="colorSwatch" style={{ backgroundColor: "#FFFFFF" }} onClick={LUMIKeys.getClickHandler_SetColorRootKey("rgb", 0xff, 0xff, 0xff)}></div>
                        <div className="colorSwatch" style={{ backgroundColor: "#000000" }} onClick={LUMIKeys.getClickHandler_SetColorRootKey("rgb", 0x00, 0x00, 0x00)}></div>
                        <div className="colorHexInput">
                            <InputSaved
                                ref={lumiRootKeyColorInput}
                                label="rootKeyColor &nbsp; #"
                                persistedStateKey={"lumi_rootKeyColor"}
                                illegalCharactersRegExpStr="[^ABCDEFG0123456789]"
                                placeholder="e.g., 3FADEE"
                                onChange={onRootKeyColorChanged}
                            />
                        </div>
                    </div>
                </div>
                <div style={{ float: "left" }}>
                    <div>Other Keys</div>
                    <div>
                        <div className="colorSwatch" style={{ backgroundColor: "#0000FF" }} onClick={LUMIKeys.getClickHandler_SetColorGlobalKey("rgb", 0x00, 0x00, 0xff)}></div>
                        <div className="colorSwatch" style={{ backgroundColor: "#00FF00" }} onClick={LUMIKeys.getClickHandler_SetColorGlobalKey("rgb", 0x00, 0xff, 0x00)}></div>
                        <div className="colorSwatch" style={{ backgroundColor: "#FF0000" }} onClick={LUMIKeys.getClickHandler_SetColorGlobalKey("rgb", 0xff, 0x00, 0x00)}></div>
                        <div className="colorSwatch" style={{ backgroundColor: "#FFFF00" }} onClick={LUMIKeys.getClickHandler_SetColorGlobalKey("rgb", 0xff, 0xff, 0x00)}></div>
                        <div className="colorSwatch" style={{ backgroundColor: "#FF00FF" }} onClick={LUMIKeys.getClickHandler_SetColorGlobalKey("rgb", 0xff, 0x00, 0xff)}></div>
                        <div className="colorSwatch" style={{ backgroundColor: "#00FFFF" }} onClick={LUMIKeys.getClickHandler_SetColorGlobalKey("rgb", 0x00, 0xff, 0xff)}></div>
                        <div className="colorSwatch" style={{ backgroundColor: "#FFFFFF" }} onClick={LUMIKeys.getClickHandler_SetColorGlobalKey("rgb", 0xff, 0xff, 0xff)}></div>
                        <div className="colorSwatch" style={{ backgroundColor: "#000000" }} onClick={LUMIKeys.getClickHandler_SetColorGlobalKey("rgb", 0x00, 0x00, 0x00)}></div>
                        <div className="colorHexInput">
                            <InputSaved
                                ref={lumiGlobalKeyColorInput}
                                label="globalKeyColor &nbsp; #"
                                persistedStateKey={"lumi_globalKeyColor"}
                                illegalCharactersRegExpStr="[^ABCDEFG0123456789]"
                                placeholder="e.g., 884544"
                                onChange={onGlobalKeyColorChanged}
                            />
                        </div>
                    </div>
                </div>
                <ClearBoth />
            </div>
        </>
    );
};
export default UserColors;
