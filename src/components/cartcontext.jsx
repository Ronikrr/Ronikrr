import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
export const Cartcontext = createContext();

export const CartProvider = ({ children }) => {
    const { id: userId } = useParams()
    const [cart, setcart] = useState([]);



    useEffect(() => {
        if (userId) {
            localStorage.setItem('id', userId);
        }
        const storedcart = localStorage.getItem("cart")
        try {

            const getCart = JSON.parse(storedcart)
            setcart(getCart ? getCart : []);
        } catch (error) {
            console.error(`Error parsing cart data from localStorage:${error} `);
            setcart([])
        }
    }, [userId])

    const addTocart = (product) => {
        const currentUserId = userId; // Use userId from URL
        const appendedProduct = { ...product, userId: currentUserId };

        setcart((prevCart) => {
            const updatedCart = [...prevCart, appendedProduct];
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const removecart = (productid) => {
        setcart((prevCart) => {
            const newCart = prevCart.filter(product => product.id !== productid); // Filter out the product
            localStorage.setItem("cart", JSON.stringify(newCart)); // Update localStorage
            return newCart;
        });

    }

    return (
        <Cartcontext.Provider value={{ cart, addTocart, removecart }} >
            {children}
        </Cartcontext.Provider>
    )
}

// import React, { createContext, useContext, useReducer } from 'react'
// const initialState = {
//     items: [],
//     totalQuantity: 0,
//     totalPrice: 0,
// }
// const formatPrice = (price) => {
//     return `₹${parseFloat(price).toFixed(2)}`;
// };

// // Example usage:
// // const formattedPrice = formatPrice(25.5); // "₹25.50"

// export const Cartcontext = createContext(initialState);

// const cartReducer = (state, action) => {
//     switch (action.type) {
//         case 'ADD_ITEM': {
//             const newItem = action.payload;
//             const existingItem = state.items.find(item => item.id === newItem.id);
//             const itemPrice = parseFloat(formatPrice(newItem.price));
//             const itemTotalPrice = itemPrice * (newItem.quantity || 1); // Ensure default quantity is 1

//             let updatedItems;

//             if (existingItem) {
//                 // If item exists, update the quantity and total price
//                 updatedItems = state.items.map(item =>
//                     item.id === newItem.id
//                         ? {
//                             ...item,
//                             quantity: item.quantity + newItem.quantity,
//                             totalPrice: item.totalPrice + itemTotalPrice,
//                         }
//                         : item
//                 );
//             } else {
//                 // If item does not exist, add a new item to the cart
//                 updatedItems = [
//                     ...state.items,
//                     {
//                         id: newItem.id,
//                         name: newItem.name,
//                         price: itemPrice,
//                         quantity: newItem?.quantity || 1,
//                         totalPrice: itemTotalPrice,
//                     }
//                 ];
//             }

//             // Return the updated state
//             return {
//                 ...state,
//                 items: updatedItems,
//                 totalQuantity: state.totalQuantity + (newItem.quantity || 1),
//                 totalPrice: state.totalPrice + itemTotalPrice,
//             };
//         }
//         case 'UPDATE_ITEM_QUANTITY':
//             // Logic to update item quantity
//             return { ...state };
//         case 'REMOVE_ITEM':
//             // Logic to remove item
//             return { ...state };
//         default:
//             return state;
//     }
// };

// export const CartProvider = ({ children }) => {
//     // const [state, dispatch] = useReducer(cartReducer, ini)
//     const [state, dispatch] = useReducer(cartReducer, initialState)
//     return (
//         <Cartcontext.Provider value={{ state, dispatch }} >
//             {children}
//         </Cartcontext.Provider>
//     )
// }

// export const useCart = () => {
//     const context = React.useContext(Cartcontext);
//     if (!context) {
//         throw new Error("useCart must be used within a CartProvider");
//     }
//     return context;
// };




