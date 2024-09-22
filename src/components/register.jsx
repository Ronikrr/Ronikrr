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
        const { name, value, files } = e.target;

        if (name === 'avatar') {
            if (files && files.length > 0) {
            // Handle file selection only if files are available
                setformdata({
                    ...form,
                    avatar: files[0], // Store the selected file
                });
            } else {
                // If no file is selected, you might want to clear the avatar
                setformdata({
                    ...form,
                    avatar: null,
                });
            }
        } else {
            setformdata({
                ...form,
                [name]: value,
            })
        }
    }
    const generateId = () => {
        return 'user-' + Math.random().toString(36).substr(2, 9); // Simple ID generator
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        if (!form.name || typeof form.name !== 'string') {
            setalertmessage('Name is required and must be a string.');
            setalertype('danger');
            return;
        }

        if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
            setalertmessage('Email is required and must be a valid email address.');
            setalertype('danger');
            return;
        }

        if (!form.password || form.password.length < 4 || !/^[a-zA-Z0-9]+$/.test(form.password)) {
            setalertmessage('Password is required, must be at least 4 characters long, and contain only letters and numbers.');
            setalertype('danger');
            return;
        }

        if (!form.avatar) {
            setalertmessage('Avatar file is required.');
            setalertype('danger');
            return;
        }

        const id = generateId();
        const payload = new FormData();
        payload.append('id', id); 
        payload.append('name', form.name);
        payload.append('email', form.email);
        payload.append('password', form.password);
        payload.append('role', 'customer'); 
        if (form.avatar) {
            payload.append('avatar', form.avatar);
        }


        try {
            const res = await fetch('https://api.escuelajs.co/api/v1/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify(payload), 

            });
            if (res.ok) {
                const result = await res.json();
                setalertmessage('User created successfully!');
                setalertype('success');
                console.log(result);
                // navigate('/login');
            } else {
                const errorData = await res.json();
                setalertmessage(`Failed to create user: ${errorData.message || 'Unknown error'}`);
                setalertype('danger');
                console.error('Error details:', errorData); 
            }
        } catch (error) {
            setalertmessage(`An error occurred: ${error.message}`);
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
                                type="file"
                                id="avatar"
                                name="avatar"
                                className='form-control'
                                // value={form.avatar}
                                accept='image/*'
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