import React, { useContext, useEffect, useState } from 'react'
import { FaUser, FaCartPlus, FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { useCart } from './cartcontext';
import { WishlistContext } from './wishlistcontext';
// import './Header.css'; // Create a separate CSS file for better structure

function Header() {
    const [profile, setProfile] = useState(null); // State to store profile data
    const token = localStorage.getItem('token'); // Get token from localStorage
    const { cart } = useCart()
    const { wishlist } = useContext(WishlistContext)
    const [headerStyle, setHeaderStyle] = useState({
        height: '100px',
        backgroundColor: 'transparent',
        color: '#000',
        boxShadow: 'none',
        justifyContent: 'center',
        // alignItems: 'center',
    });
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setHeaderStyle({
                    height: "60px",
                    backgroundColor: "#fff",
                    color: "#000",
                    boxShadow: "0px 4px 2px -2px gray",
                    justifyContent: "center",
                    // alignItems: "center",
                });
            } else {
                setHeaderStyle({
                    height: "100px",
                    backgroundColor: "transparent",
                    color: "#000",
                    boxShadow: "none",
                    justifyContent: "center",
                    // alignItems: "center",
                });
            }
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    useEffect(() => {
        const fetchProfile = async () => {
            if (!token) return; // Skip fetch if token is null

            const controller = new AbortController(); // Create abort controller
            try {
                const res = await fetch(`https://api.escuelajs.co/api/v1/auth/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    signal: controller.signal, // Pass the abort signal
                });

                if (res.ok) {
                    const data = await res.json();
                    setProfile(data);
                } else {
                    console.error('Failed to fetch profile');
                }
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Error fetching profile:', error);
                }
            }

            return () => controller.abort(); // Cleanup function to abort fetch
        };

        fetchProfile();
    }, [token]);

    const items = cart?.items || [];  // Safely handle cart items
    const wishlistItems = wishlist?.items || [];  // Safely handle wishlist items
    const isLoggedIn = () => {
        const token = localStorage.getItem('access_token'); // or check cookies
        return token !== null; // Adjust based on your token validation logic
    };


    return (
        <header style={{ ...headerStyle, zIndex: "10000", width: "100%" }} className="header d-flex position-fixed">
            <div className="container">
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <Link className="navbar-brand" onClick={scrollToTop} to="/">
                            Navbar
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse overflow-auto" id="navbarNav" style={{ maxHeight: '100%' }}>
                            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 text-capitalize">
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={scrollToTop} aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={scrollToTop} to="/productpage">Product</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={scrollToTop} to="/category">Categories</Link>
                                </li>
                            </ul>
                            <div className="d-flex icons">
                                {/* <Link className="nav-link mx-3" onClick={scrollToTop} to="/account">
                                    <FaUser />
                                </Link>
                                <Link className="nav-link mx-3 position-relative" onClick={scrollToTop} to="/cart">
                                    <FaCartPlus />
                                    <span className="text-bg-primary position-absolute start-100 translate-middle border border-light rounded-circle"
                                        style={{ top: '8px', padding: '0px 6px', fontSize: '12px' }}>
                                        <span className=""> {cart.length} </span>
                                    </span>
                                </Link>
                                <Link className="nav-link mx-3 position-relative" onClick={scrollToTop} to="/wishlistpage">
                                    <FaHeart />
                                    <span className="text-bg-primary position-absolute start-100 translate-middle border border-light rounded-circle"
                                        style={{ top: '8px', padding: '0px 6px', fontSize: '12px' }}>
                                        <span className=""> {wishlist.length} </span>
                                    </span>
                                </Link> */}

                                {isLoggedIn() ? (

                                    <>
                                        <Link className="nav-link mx-3" onClick={scrollToTop} to="/account">
                                            <FaUser />
                                        </Link>

                                        <Link className="nav-link mx-3 position-relative" onClick={scrollToTop} to="/cart">
                                            <FaCartPlus />
                                            <span className="text-bg-primary position-absolute start-100 translate-middle border border-light rounded-circle"
                                                style={{ top: '8px', padding: '0px 6px', fontSize: '12px' }}>
                                                <span>{cart.length}</span> {/* Safely access cart length */}
                                            </span>
                                        </Link>

                                        <Link className="nav-link mx-3 position-relative" onClick={scrollToTop} to="/wishlistpage">
                                            <FaHeart />
                                            <span className="text-bg-primary position-absolute start-100 translate-middle border border-light rounded-circle"
                                                style={{ top: '8px', padding: '0px 6px', fontSize: '12px' }}>
                                                <span>{wishlist.length}</span> {/* Safely access wishlist length */}
                                            </span>
                                        </Link>

                                    </>
                                ) : (
                                        <>
                                            <div className="btn-group  " role="group" aria-label="Basic example">
                                                <Link type="button" className="btn btn-primary text-bg-primary" onClick={scrollToTop} to="/login" >
                                                    Login
                                                </Link>
                                                <Link type="button" className="btn btn-secondary text-bg-primary" onClick={scrollToTop} to="/register" >
                                                    Register
                                                </Link>
                                            </div>
                                        </>

                                )}
                            </div>
                        </div>
                    </div>
                </nav>

            </div>
        </header>
    );
}

export default Header;
