import { createContext, useState } from 'react'

export const CartContext = createContext(null)

export default ({children}) => {
    const [cart, setCart] = useState({
        type: '',
        focus: ''
    })

    const [activeFocus, setActiveFocus] = useState({
		nutrition: false,
		diabetes: false,
		weightLoss: true,
    });

    const [activePackage, setActivePackage] = useState(null)

    return (
        <CartContext.Provider value={{cart,setCart, activeFocus, setActiveFocus, activePackage, setActivePackage}}>
            {children}
        </CartContext.Provider>
    )
}