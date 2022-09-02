import { useState } from "react";


const useDialog = (defaultState = false) => {
    const [state, setState] = useState<boolean>(defaultState);

    const open = () => {
        setState(true);
    };

    const close = () => {
        setState(false);
    };

    return {
        state,
        open,
        close
    }
}

export default useDialog;