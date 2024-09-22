
import React, { useContext, useEffect, useState } from 'react';
import { Cartcontext } from './cartcontext';
import { MdRemoveShoppingCart } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function Cartsection() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { cart, removecart } = useContext(Cartcontext);

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
                <div className="container">
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
                                                <th>Product Name</th>
                                                <th>Price</th>
                                                <th>Image</th>
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
                                                    <td>{item.title}</td>
                                                    <td>Rs.{item.price}</td>
                                                <td>
                                                    <button className='border' onClick={() => removecart(item.id)}>
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
