import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [usersCarts, setUsersCarts] = useState(() => {
        // Load from localStorage or initialize as an empty object
        const savedCarts = localStorage.getItem('usersCarts');
        return savedCarts ? JSON.parse(savedCarts) : {};
    });

    const addToCart = (userId, item) => {
        setUsersCarts((prevCarts) => {
            const userCart = prevCarts[userId] || [];
            const updatedCarts = { ...prevCarts, [userId]: [...userCart, item] };
            localStorage.setItem('usersCarts', JSON.stringify(updatedCarts)); // Save to localStorage
            return updatedCarts;
        });
    };

    const removeFromCart = (userId, itemId) => {
        setUsersCarts((prevCarts) => {
            const userCart = prevCarts[userId] || [];
            const updatedCarts = { ...prevCarts, [userId]: userCart.filter(item => item.id !== itemId) };
            localStorage.setItem('usersCarts', JSON.stringify(updatedCarts)); // Save to localStorage
            return updatedCarts;
        });
    };

    const getCartItems = (userId) => {
        const items = usersCarts[userId] || [];
        return items;
    };

    // Sync localStorage whenever usersCarts changes
    useEffect(() => {
        localStorage.setItem('usersCarts', JSON.stringify(usersCarts));
    }, [usersCarts]);

    return (
        <CartContext.Provider value={{ addToCart, removeFromCart, getCartItems }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
