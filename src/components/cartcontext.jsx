import React, { createContext, useEffect, useState } from 'react';
// import { login } from './login'
export const Cartcontext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setcart] = useState([]);

    useEffect(() => {
        const getCart = JSON.parse(localStorage.getItem("cart"))
        setcart(getCart ? getCart : []);
    },[])

    const addtocart = (product) => {
        const userId = localStorage.getItem('id')

        const appededPro = { ...product, userId: userId }

        setcart([...cart, appededPro]);
        localStorage.setItem("cart", JSON.stringify([...cart, appededPro]));
    }

    const removecart = (productid) => {
        const newCart = cart.filter((product) => product.id !== productid);
        setcart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    }

    return (
        <Cartcontext.Provider value={{ cart, addtocart, removecart }} >
            {children}
        </Cartcontext.Provider>
    )
}

