import React, { useContext, useEffect, useState } from 'react';
import { MdRemoveCircle } from "react-icons/md";
import { WishlistContext } from './wishlistcontext';

const Wishsection = () => {
    const { wishlist, removeWishlist } = useContext(WishlistContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null); // State to store user info

    useEffect(() => {
        const fetchUserData = async () => {
            const accessToken = localStorage.getItem('access_token');
            if (!accessToken) {
                setError('No access token found.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`https://api.escuelajs.co/api/v1/auth/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                setUser(data); // Set user data
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) return <div>Loading your wishlist...</div>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <section className="product">
                <div className="col-12 pro_heading text-capitalize d-flex align-items-center justify-content-center">
                    <div className='overlay'></div>
                    <h1 style={{ position: "relative", zIndex: 1 }}>Wishlist Page</h1>
                </div>
                <div className="container">
                    {user && <h2>Welcome, {user.name}</h2>} {/* Displaying user name */}
                    <div className="row p-5">
                        {wishlist.length === 0 ? (
                            <div className="col-12">
                                <div className="table-responsive">
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
                                            <tr>
                                                <td colSpan="5" className='text-center'>No products in wishlist</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <div className="col-12">
                                <div className="table-responsive">
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
                                                {wishlist.map((item) => (
                                                    <tr key={item.id}>
                                                        <td>{item.id}</td>
                                                        <td>{item.title}</td>
                                                    <td>Rs.{item.price}</td>
                                                    <td>
                                                        <img src={item.images} alt={item.title} style={{ width: '100px', height: 'auto' }} />
                                                    </td>
                                                    <td>
                                                        <button
                                                            className='border'
                                                            onClick={() => removeWishlist(item.id)}
                                                            aria-label={`Remove ${item.title} from wishlist`}
                                                        >
                                                            <MdRemoveCircle />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Wishsection;
