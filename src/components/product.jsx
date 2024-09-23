import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCartArrowDown, FaRegEye, FaExchangeAlt, FaHeart } from 'react-icons/fa';
import { WishlistContext } from './wishlistcontext'
import { useCart } from './cartcontext';




function Product({ userId }) {
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart();
    const { addToWishlist } = useContext(WishlistContext);
    const scrollToTop = () => {
        window.scrollTo({
            top:0,
            behavior:'smooth'
        });
    };

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await fetch(`https://api.escuelajs.co/api/v1/products`); // Correct path to access from public folder
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const firstFiveProducts = data.slice(0, 5);
                console.log(firstFiveProducts);
                setProducts(firstFiveProducts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchdata();
    }, []);

    return (
        <div>
            <section className="product heading p-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12  text-capitalize text-center">
                            <h1>product</h1>
                        </div>
                        <div className="col-12 d-flex flex-wrap align-items-center justify-content-center mb-5">
                            {products.length === 0 ? (
                                <p>loading products</p>
                            ) : (
                                products.map((v, i) => (
                                    <Link key={i} to={`/category/${v.category.id}/productpage/${v.id}`} className="card col-12 col-sm-6 col-md-4 col-lg-2  m-3 text-decoration-none">
                                        <img src={v.images} className="card-img-top page_image img-fluid" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title " > {v.title} </h5>
                                            <p className="card-text">
                                                ${v.price}
                                            </p>
                                            <div className="button-group d-flex align-items-center justify-content-center w-100">
                                                <Link onClick={addToCart(userId, v)} className='box border-0 mx-1 text-bg-light' >
                                                    <FaCartArrowDown />
                                                </Link>
                                                <Link to={`/productpage/${v.id}`} className='box border-0 mx-1 text-bg-light' >
                                                    <FaRegEye />
                                                </Link>
                                                <Link className='box border-0 mx-1 text-bg-light' onClick={() => addToWishlist(v)}  >
                                                    <FaHeart />
                                                </Link>
                                                <Link className='box border-0 mx-1 text-bg-light'>
                                                    <FaExchangeAlt />
                                                </Link>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                                )
                            }
                        </div>
                    </div>
                    <div className="text-center col-12 mb-3">
                        <Link to="/productpage" onClick={scrollToTop} className="btn btn-primary col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 text-capitalize ">
                            see more
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Product