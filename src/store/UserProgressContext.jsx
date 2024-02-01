import { createContext, useState } from "react";

export const UserProgressContext = createContext({
    progress: '', // 'cart', 'checkout'
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {}
});

export default function UserProgressContextProvider({children}) {
    const [userProgress, setUserProgress] = useState();

    function showCart() {
        setUserProgress('cart');
    }

    function hideCart() {
        setUserProgress('');
    }

    function showCheckout() {
        setUserProgress('checkout');
    }

    function hideCheckout() {
        setUserProgress('');
    }

    const ctxValue = {
        progress: userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
    }

    return (
        <UserProgressContext.Provider value={ctxValue}>{children}</UserProgressContext.Provider>
    )
}