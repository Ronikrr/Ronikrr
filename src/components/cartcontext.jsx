import React, { createContext, useEffect, useState } from 'react';

export const Cartcontext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setcart] = useState([]);

    useEffect(() => {
        const getCart = JSON.parse(localStorage.getItem("cart"))
        setcart(getCart ? getCart : []);
    },[])

    const addtocart = (product) => {
        setcart([...cart, product]);
        localStorage.setItem("cart", JSON.stringify([...cart, product]));
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

