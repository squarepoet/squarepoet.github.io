import ComputerKeyboardInput from "apps/midi/ComputerKeyboardInput";
import Constants from "apps/shared/Constants";
import { useState } from "react";

const ComputerKeyboardInputElement = () => {
    const [computerKeyboardInputText, setComputerKeyboardInputText] = useState(Constants.Messages.COMPUTER_KEYBOARD_INPUT_1);

    return (
        <input
            className="computerKeyboardInput"
            onFocus={() => setComputerKeyboardInputText(Constants.Messages.COMPUTER_KEYBOARD_INPUT_2)}
            onBlur={() => setComputerKeyboardInputText(Constants.Messages.COMPUTER_KEYBOARD_INPUT_1)}
            onKeyDown={ComputerKeyboardInput.onKeyDown}
            onKeyUp={ComputerKeyboardInput.onKeyUp}
            value={computerKeyboardInputText}
            readOnly
        />
    );
};

export default ComputerKeyboardInputElement;
