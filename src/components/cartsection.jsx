import React, { useContext } from 'react'
import { Cartcontext } from './cartcontext';
import { MdRemoveShoppingCart } from "react-icons/md";
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
function Cartsection() {

    const { cart, removecart } = useContext(Cartcontext)
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