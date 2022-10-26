import * as React from 'react';
import StoreContext from "./StoreContext";
import StoreReducer, { initState } from "./StoreReducer";


function StoreProvider({ children }) {
    const [state, dispatch] = React.useReducer(StoreReducer, initState)
    return (
        <StoreContext.Provider value={[state, dispatch]}>
                {children}
        </StoreContext.Provider>
    )
}

export default StoreProvider