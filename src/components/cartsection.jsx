import React, { useContext, useEffect, useState } from 'react'
import { Cartcontext } from './cartcontext';
import { MdRemoveShoppingCart } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function Cartsection() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { cart, removecart } = useContext(Cartcontext)

    useEffect(() => {
        const fetchuserdata = async () => {
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
                    throw new Error('failed to fetch user data');
                }
                const data = await res.json();
                setUser(data);
                setLoading(false)

            } catch (error) {
                console.error('Error fetching user data:', error);
                setError(error.message);
                setLoading(false);
            }
        }
        fetchuserdata()
    }, [navigate])
    if (loading) return <div className="loader_head">
        <div className="loader"></div>
    </div>;


    if (error) return <p>Error loading user data: {error.message}</p>;
    if (!user) return <p>No user data available.</p>;

    return (
        <div>
            <section className="product">
                <div className="col-12 pro_heading text-capitalize d-flex align-items-center justify-content-center">
                    <div className='overlay' ></div>
                    <h1 style={{ position: "relative", zIndex: 1 }}>cart page</h1>
                </div>
                <div className="container">
                    <div className="row p-3 p-md-5">
                        {
                            cart.length === 0 ? (
                                <div className="col-12">
                                    <div className="table-responsive">
                                        <table className="table table-bordered">
                                            <thead className="thead-light" >
                                                <tr>
                                                    <th>id</th>
                                                    <th>Product Name</th>
                                                    <th>Price</th>
                                                    <th>Image</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody >
                                                <tr>
                                                    <td colSpan="5" className='text-center'    >No products in cart</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ) : (
                                <div className="col-12">
                                    <div className="table-responsive">

                                        <table className="table table-bordered">
                                            <thead className="thead-light" >
                                                <tr>
                                                    <th>id</th>
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
                                                        <td className='' >
                                                            <button className='border' onClick={() => removecart(item.id)}>
                                                                <MdRemoveShoppingCart />
                                                            </button>

                                                            <button className='btn btn-primary ms-2' >
                                                                buy now
                                                            </button>

                                                        </td>   
                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Cartsection