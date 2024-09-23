
import React, { useContext, useEffect, useState } from 'react';
import { Cartcontext } from './cartcontext';
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdRemoveShoppingCart } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function Cartsection() {
    const [quantity, setQuantity] = useState(1);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { cart, removeFromCart } = useContext(Cartcontext);
    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };
    useEffect(() => {
        const fetchUserData = async () => {
            const accessToken = localStorage.getItem('access_token');
            // const userId = localStorage.getItem('user_id'); 
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
                <div className="container py-5 ">
                    <h2>Welcome, {user.name}</h2> {/* Displaying user's name */}
                    <div className="row p-3 p-md-5">
                        {cart.length === 0 ? (
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

                                        <td colSpan="5" className='text-center'  >No products in cart.</td>
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
                                            {cart.map((item) => (
                                                <tr key={item.id}>
                                                    <td>{item.id}</td>
                                                    <td>
                                                        <img src={item.images} alt={item.title} style={{ width: '100px', height: 'auto' }} />
                                                    </td>
                                                    <td className="input-group mb-3" style={{ width: 170 }}>
                                                        <button className="btn btn-white border border-secondary px-3" type="button" onClick={handleDecrease}>
                                                            <FaMinus />
                                                        </button>
                                                        <input
                                                            type="text"
                                                            className="form-control text-center border border-secondary"
                                                            value={quantity}
                                                            readOnly
                                                        />
                                                        <button className="btn btn-white border border-secondary px-3" type="button" onClick={handleIncrease}>
                                                            <FaPlus />
                                                        </button>
                                                    </td>
                                                    <td>{item.title}</td>
                                                    <td>Rs.{item.price * quantity}</td>
                                                <td>
                                                        <button className='border' onClick={() => removeFromCart(item.id)}>
                                                        <MdRemoveShoppingCart />
                                                    </button>
                                                    <button className='btn btn-primary ms-2'>Buy Now</button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                        )}
                    </div>
                </div>
            </section >
        </div >
    );
}

export default Cartsection;
