import React, { useContext, useEffect, useState } from 'react';
import { Cartcontext, useCart } from './cartcontext';
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdRemoveShoppingCart } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Cartsection = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    // const { cart, removecart } = useContext(Cartcontext);
    const { removeFromCart, getCartItems } = useCart();
    const cartItems = getCartItems(userId);

    // Initialize quantities state
    const [quantities, setQuantities] = useState({});

    const handleDecrease = (id) => {
        setQuantities(prev => ({
            ...prev,
            [id]: Math.max((prev[id] || 1) - 1, 1) // Ensure quantity is at least 1
        }));
    };

    const handleIncrease = (id) => {
        setQuantities(prev => ({
            ...prev,
            [id]: (prev[id] || 1) + 1
        }));
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const accessToken = localStorage.getItem('access_token');
            if (!accessToken) {
                navigate("/login");
                return;
            }

            try {
                const res = await fetch(`https://api.escuelajs.co/api/v1/auth/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    }
                });
                if (!res.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await res.json();
                setUser(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [navigate]);

    if (loading) return <div className="loader_head"><div className="loader"></div></div>;
    if (error) return <p>Error loading user data: {error.message}</p>;
    if (!user) return <p>No user data available.</p>;

    return (
        <div>
            <section className="product">
                <div className="col-12 pro_heading text-capitalize d-flex align-items-center justify-content-center">
                    <h1>Cart Page</h1>
                </div>
                <div className="container py-5">
                    <h2>Welcome, {user.name}</h2>
                    <div className="row p-3 p-md-5">
                        {cartItems.length === 0 ? (
                            <div className="col-12">
                                <table className="table table-bordered">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>ID</th>
                                            <th>Product Name</th>
                                            <th>Price</th>
                                            <th>Image</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <td colSpan="5" className='text-center'>No products in cart.</td>
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="col-12">
                                    <table className="table table-bordered">
                                        <thead className="thead-light">
                                            <tr>
                                                <th>ID</th>
                                                <th>Image</th>
                                                <th>Quantity</th>
                                                <th>Product Name</th>
                                                <th>Price</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItems.map((item) => {
                                                const quantity = quantities[item.id] || 1; // Use the current quantity
                                                return (
                                                <tr key={item.id}>
                                                    <td>{item.id}</td>
                                                    <td>
                                                        <img src={item.images} alt={item.title} style={{ width: '100px', height: 'auto' }} />
                                                    </td>
                                                    <td className="input-group mb-3" style={{ width: 170 }}>
                                                            <button className="btn btn-white border border-secondary px-3" type="button" onClick={() => handleDecrease(item.id)}>
                                                            <FaMinus />
                                                        </button>
                                                        <input
                                                            type="text"
                                                            className="form-control text-center border border-secondary"
                                                            value={quantity}
                                                            readOnly
                                                        />
                                                            <button className="btn btn-white border border-secondary px-3" type="button" onClick={() => handleIncrease(item.id)}>
                                                            <FaPlus />
                                                        </button>
                                                    </td>
                                                    <td>{item.title}</td>
                                                    <td>Rs.{item.price * quantity}</td>
                                                        <td>
                                                            <button className='border' onClick={() => removeFromCart(userId, item.id)}>
                                                                <MdRemoveShoppingCart />
                                                            </button>
                                                            <button className='btn btn-primary ms-2'>Buy Now</button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Cartsection;
// import React, { useState } from 'react';
// import { RxCross2 } from "react-icons/rx";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Link, useNavigate } from 'react-router-dom';
// import { useCart } from './cartcontext'; // Import the custom hook

// const Cartscreen = () => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();
//     const { state: cart, dispatch } = useCart();

//     const [quantities, setQuantities] = useState(
//         cart.items.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity }), {})
//     );

//     const handleQuantityChange = (id, value) => {
//         const newQuantity = Math.max(1, value);
//         setQuantities((prev) => ({ ...prev, [id]: newQuantity }));
//         dispatch({ type: 'UPDATE_ITEM_QUANTITY', payload: { id, quantity: newQuantity } });
//     };

//     const handleRemoveItem = (id) => {
//         dispatch({ type: 'REMOVE_ITEM', payload: id });
//     };

//     return (
//         <div className="cartscreen  ">
//             <div className="col-12 pro_heading text-capitalize d-flex align-items-center justify-content-center">
//                 <div className='overlay'></div>
//                 <h1 style={{ position: "relative", zIndex: 1 }}>Wishlist Page</h1>
//             </div>

//             <div className='col-12 container py-5'>
//                 <div className="table-responsive ">
//                     <table className="table table-striped mb-5">
//                         <thead>
//                             <tr className='table_heading'>
//                                 <th scope="col" className='p-3 p-md-4 border-0 product_heading fw-normal'>Product</th>
//                                 <th scope="col" className='p-3 p-md-4 border-0 fw-normal'>Price</th>
//                                 <th scope="col" className='p-3 p-md-4 border-0 fw-normal col-9 d-flex'>Quantity</th>
//                                 <th className='p-sm-4 border-bottom-0 radius_right'>Total Price</th>
//                             </tr>
//                         </thead>
//                         <tbody className='col-12'>
//                             {cart.items.map((order) => (
//                                 <tr key={order.id} className='border col-12'>
//                                     <th className='pe-3 pe-sm-4 py-3 py-md-4 ps-2 d-flex align-items-center border-bottom-0 fw-normal'>
//                                         <Link to="#" className='text-black' onClick={() => handleRemoveItem(order.id)}>
//                                             <RxCross2 className='me-2' />
//                                         </Link>
//                                         <span className='d-flex me-3 rounded-1'></span>{order.name}
//                                     </th>
//                                     <td className='p-3 p-md-4'>₹{order.price}</td>
//                                     <td className='px-2 px-sm-3 px-md-4 py-3 col-4 col-md-3 col-xxl-2'>
//                                         <div className="quantity_main_box col-8 border rounded-pill d-flex justify-content-center">
//                                             <button
//                                                 className='border-0 bg-transparent fs-3'
//                                                 onClick={() => handleQuantityChange(order.id, quantities[order.id] - 1)}
//                                             >
//                                                 -
//                                             </button>
//                                             <input
//                                                 className='col-5 border-0 text-center'
//                                                 type="number"
//                                                 value={quantities[order.id]}
//                                                 onChange={(e) => handleQuantityChange(order.id, Number(e.target.value))}
//                                             />
//                                             <button
//                                                 className='border-0 bg-transparent'
//                                                 onClick={() => handleQuantityChange(order.id, quantities[order.id] + 1)}
//                                             >
//                                                 +
//                                             </button>
//                                         </div>
//                                     </td>
//                                     <td className='p-3 p-md-4 d-flex justify-content-center border-bottom-0'>
//                                         ₹{(order.price * quantities[order.id]).toFixed(2)}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//                 <table className="table mb-0">
//                     <thead>
//                         <tr className='table_heading'>
//                             <th className='py-4 product_heading'>Total Quantity: {cart.totalQuantity}</th>
//                             <th className='py-4 text-end'>Total Price: {cart.totalPrice}</th>
//                         </tr>
//                     </thead>
//                 </table>
//                 <button className='addtocartbtn p-4 border-0 border_radius_left'>Proceed To Checkout</button>
//             </div>
//         </div>
//     );
// };
// export default Cartscreen;