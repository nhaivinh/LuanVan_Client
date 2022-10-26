import { useContext } from 'react';
import StoreContext from './StoreContext';

export const useStore = () => {
    
    const [state, dispatch] = useContext(StoreContext)

    return([state, dispatch])
}