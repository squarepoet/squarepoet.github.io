// <input ref={sharpsInput} value={sharps} onChange={onSharpsChanged} onKeyUp={onSharpsKeyUp}/>
// <input ref={flatsInput} value={flats} onChange={onFlatsChanged} onKeyUp={onFlatsKeyUp}/>

import { useRef } from "react";
import createPersistedState from "use-persisted-state";


export default (props) => {
    let key: string = props.persistedStateKey;
    const useState = createPersistedState(key);
    const [value, setValue] = useState("");

    const inputElementRef = useRef();


    let onChange = (e) => {
        let newVal = e.target.value.toUpperCase();
        setValue(newVal);
        console.log(`<InputSaved [${key}] changed to [${newVal}]`);
    }

    let onKeyUp = (e) => {
        console.log("ON KEY UP XX");
    };

    return <input ref={inputElementRef} value={value} onChange={onChange} onKeyUp={onKeyUp} />;
};
