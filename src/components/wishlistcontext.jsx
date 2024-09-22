import React, { createContext, useEffect, useState } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        try {
            const storedWishlist = JSON.parse(localStorage.getItem("wishlist"));
            setWishlist(storedWishlist ? storedWishlist : []);
        } catch (error) {
            console.error("Failed to parse wishlist from localStorage:", error);
            setWishlist([]); // Fallback to empty array on error
        }
    }, []);

    const addToWishlist = (item) => {
        const itemExists = wishlist.some(wishItem => wishItem.id === item.id);
        if (!itemExists) {
            const newWishlist = [...wishlist, item];
            setWishlist(newWishlist);
            localStorage.setItem("wishlist", JSON.stringify(newWishlist)); // Update localStorage after state update
        } else {
            console.log('Item already in wishlist');
        }
    };

    const removeWishlist = (productId) => {
        const newWishlist = wishlist.filter((product) => product.id !== productId);
        setWishlist(newWishlist);
        localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};
