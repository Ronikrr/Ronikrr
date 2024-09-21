import React, { useContext } from 'react';
import { MdRemoveCircle } from "react-icons/md";
import { WishlistContext } from './wishlistcontext';
import product_1 from '../assets/image/product_1.jpg';
import product_2 from '../assets/image/product_2.jpg';
import product_3 from '../assets/image/product_3.jpg';
import product_4 from '../assets/image/product_4.jpg';
import product_5 from '../assets/image/product_5.jpg';

// Mapping product 'src' fields to images
const imageMap = {
    'product_1': product_1,
    'product_2': product_2,
    'product_3': product_3,
    'product_4': product_4,
    'product_5': product_5,
};


const Wishsection = () => {
    const { wishlist, removeWishlist } = useContext(WishlistContext);
    return (
        <div>
            <section className="product">
                <div className="col-12 pro_heading text-capitalize d-flex align-items-center justify-content-center">
                    <div className='overlay' ></div>
                    <h1 style={{ position: "relative", zIndex: 1 }}>wishlist page</h1>
                </div>
                <div className="container">
                    <div className="row p-5">
                        {
                            wishlist.length === 0 ? (
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
                                                {wishlist.map((item) => (
                                                    <tr key={item.id}>
                                                        <td>{item.id}</td>
                                                        <td>{item.title}</td>
                                                        <td>{item.price}</td>
                                                        <td>
                                                            <img src={item.images} alt={item.title} style={{ width: '100px', height: 'auto' }} />
                                                        </td>
                                                        <td>
                                                            <button className='border' onClick={() => removeWishlist(item.id)}>
                                                                <MdRemoveCircle />
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
    );
};

export default Wishsection;
