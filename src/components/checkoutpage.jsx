import React, { useState } from 'react';
import { useParams } from 'react-router-dom';



function Checkoutpage() {
    const { id, price } = useParams();
    const [formdata, setformdata] = useState({
        name: '',
        email: '',
        address: '',
        paymentmethod: 'credit',
    });

    const handlechange = (e) => {
        const { name, value } = e.target;
        setformdata({ ...formdata, [name]: value });
    };

    const handlepayment = async (e) => {
        e.preventDefault();

        console.log('Form submitted:', formdata);
    };

    const style = {
        container: {
            width: "800px",
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "15px",
            paddingRight: "15px",
        },
        checkoutpage: {
            paddingTop: "100px",
        }
    };

    return (
        <div>
            <div style={style.checkoutpage} className="checkoutpage">
                <div style={style.container}>
                    <div className="col-md-8 offset-md-2">
                        <h2 className="text-center mb-4">Checkout</h2>
                        <form onSubmit={handlepayment}>
                            <div className="mb-3 d-flex flex-column">
                                <label htmlFor="id">Product id: {id}</label>
                                <label htmlFor="id">Price: {price}</label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input
                                    type="text"
                                    value={formdata.name}
                                    onChange={handlechange}
                                    className='form-control'
                                    id="name"
                                    name='name'
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    value={formdata.email}
                                    onChange={handlechange}
                                    className='form-control'
                                    id="email"
                                    name='email'
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Address</label>
                                <textarea
                                    className='form-control'
                                    value={formdata.address}
                                    onChange={handlechange}
                                    id="address"
                                    name='address'
                                    placeholder="Enter your address"
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="paymentmethod">Payment Method</label>
                                <select
                                    name="paymentmethod"
                                    value={formdata.paymentmethod}
                                    onChange={handlechange}
                                    className="form-select"
                                    id="paymentmethod"
                                    required
                                >
                                    <option value="" disabled>Select payment method</option>
                                    <option value="creditcard">Credit Card</option>
                                    <option value="paypal">Paypal</option>
                                </select>
                            </div>
                            <button type='submit' className="btn btn-primary">Complete Purchase</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkoutpage;
