import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
    const navigate = useNavigate();
    const [form, setformdata] = useState({
        name: '',
        email: '',
        password: '',
        avatar: 'null'
    })
    const [alertmessage, setalertmessage] = useState(null);
    const [alerttype, setalertype] = useState(null);

    const handlechange = (e) => {
        const { name, value, file } = e.target;

        if (name === 'avatar') {
            setformdata({
                ...form,
                avatar: file[0]
            })
        } else {
            setformdata({
                ...form,
                [name]: value,
            })
        }
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        const payload = new FormData();
        payload.append('name', form.name);
        payload.append('email', form.email);
        payload.append('password', form.password);
        if (form.avatar) {
            payload.append('avatar', form.avatar);
        }


        try {
            const res = await fetch('https://api.escuelajs.co/api/v1/users/', {
                method: 'POST',
                body: payload,

            });
            if (res.ok) {
                const result = await res.json();
                setalertmessage('User created successfully!');
                setalertype('success');
                console.log(result);
                // navigate('/login');
            } else {
                setalertmessage('Failed to create user.');
                setalertype('danger');
            }
        } catch (error) {
            setalertmessage('An error occurred.');
            setalertype('danger');
            console.error('Error:', error);
        }
    }
    useEffect(() => {
        if (alerttype === 'success') {
            const timer = setTimeout(() => {
                navigate('/login');
            }, 5000); // 5000 milliseconds = 5 seconds

            // Cleanup timer on component unmount
            return () => clearTimeout(timer);
        }
    }, [alerttype, navigate]);

    return (
        <div>
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
                    <h2 className="text-center mb-4">Register</h2>
                    <form onSubmit={handlesubmit} >
                        {alertmessage && (
                            <div className={`alert alert-${alerttype}`} role="alert">
                                {alertmessage}
                            </div>
                        )}


                        <div className="form-group my-3">
                            <label htmlFor="email">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name='name'
                                value={form.name}
                                onChange={handlechange}
                                required
                            />
                        </div>

                        <div className="form-group my-3">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name='email'
                                value={form.email}
                                onChange={handlechange}
                                required
                            />
                        </div>

                        <div className="form-group my-3">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className='form-control'
                                value={form.password}
                                onChange={handlechange}
                                required
                            />
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="avatar">Avatar URL:</label>
                            <input
                                type="url"
                                id="avatar"
                                name="avatar"
                                className='form-control'
                                value={form.avatar}
                                onChange={handlechange}
                                required
                            />

                        </div>


                        <button type="submit" className="btn btn-primary w-100" >
                            Register
                        </button>
                        <div className="form-group text-center my-3">

                            <label htmlFor="" className='text-center' >if you registered alreday <Link to='/login'>Login</Link> </label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register