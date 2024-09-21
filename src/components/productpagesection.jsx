import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCartArrowDown, FaRegEye, FaExchangeAlt, FaHeart } from 'react-icons/fa';
import { WishlistContext } from './wishlistcontext'
import { Cartcontext } from './cartcontext';


function Productpagesection() {
    const [products, setProducts] = useState([]);
    const { addtocart } = useContext(Cartcontext)
    const { addToWishlist } = useContext(WishlistContext);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await fetch(`https://api.escuelajs.co/api/v1/products`); 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
                setProducts(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchdata();
    }, []);


    return (
        <div>
            <section className="product_page">
                <div className="col-12 pro_heading text-capitalize d-flex align-items-center justify-content-center">
                    <div className='overlay' ></div>
                    <h1 style={{ position: "relative", zIndex: 1 }}>Product</h1>
                </div>
                <div className="container">
                    <div className="row">
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
                                                <Link onClick={() => addtocart(v)} className='box border-0 mx-1 text-bg-light' >
                                                    <FaCartArrowDown />
                                                </Link>
                                                <Link to={`/category/${v.category.id}/productpage/${v.id}`} className='box border-0 mx-1 text-bg-light' >
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
                </div>
            </section>
        </div>
    );
}

export default Productpagesection;

