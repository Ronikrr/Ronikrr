import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaMinus, FaPlus } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { WishlistContext } from './wishlistcontext';
import { Cartcontext } from './cartcontext';

function ProductPage() {
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null); // Change to single product
    const { addtocart } = useContext(Cartcontext);
    const { addToWishlist } = useContext(WishlistContext);
    const { id } = useParams();
    // const handleAddToCart = (product) => {
    //     addtocart(product);
    // }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`); // Fetch single product by ID
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    if (!product) {
        return <div>Loading...</div>; // Show a loading state
    }

    const { title, images, price, description, category } = product;

    return (
        <div>
            <section style={{ paddingTop: '150px', paddingBottom: '150px' }}>
                <div className="container">
                    <div className="row gx-5">
                        <aside className="col-lg-6">
                            <div className=" rounded-4 mb-3 d-flex justify-content-center">
                                <Link to="#" target="_blank" className=" border rounded-4">
                                    <img
                                        style={{ maxWidth: "100%", maxHeight: "75vh", margin: "auto" }}
                                        className="rounded-4 fit"
                                        src={images[0]} // Use the first image
                                        alt="Main product"
                                    />
                                </Link>
                            </div>
                        </aside>

                        <main className="col-lg-6">
                            <div className="ps-lg-3">
                                <h4 className="title text-dark">{title}</h4>
                                <h6 className='title text-secondary'>{category.name}</h6>
                                <div className="d-flex flex-row my-3">
                                    <div className="text-warning mb-1 me-2">
                                        <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStarHalfAlt />
                                        <span className="ms-1">4.5</span>
                                    </div>
                                    <span className="text-muted">  100 orders</span>
                                    <span className="text-success ms-2">In stock</span>
                                </div>
                                <div className="mb-3">
                                    <span className="h5">${price}</span>
                                    <span className="text-muted"> /per box</span>
                                </div>
                                <p>{description}</p>
                                <hr />
                                <div className="row mb-4">
                                    <div className="col-md-4 col-6">
                                        <label className="mb-2">Size</label>
                                        <select className="form-select border border-secondary" style={{ height: 35 }}>
                                            <option>Small</option>
                                            <option>Medium</option>
                                            <option>Large</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4 col-6 mb-3">
                                        <label className="mb-2 d-block">Quantity</label>
                                        <div className="input-group mb-3" style={{ width: 170 }}>
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
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <Link to={`/productpage/${product.id}/checkout/${price}`} className="btn btn-warning shadow-0 me-2">Buy now</Link>
                                    <Link className="btn btn-primary shadow-0 me-2" onClick={() => addtocart(product)}>
                                        Add to cart
                                    </Link>
                                    <Link onClick={() => addToWishlist(product)} className="btn btn-light border border-secondary p-2 icon-hover">
                                        <CiHeart /> Save
                                    </Link>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ProductPage;

