// import React from 'react'
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Login = () => {

    const [values, setValues] = useState(
        {
            email: '',
            password: '',
        }
    );

    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    const [error, setErrpr] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/login', values)
            .then(res => {
                console.log(res)
                if (res.data.status === 'success') {
                    navigate('/')
                } else {
                    setErrpr(res.data.error);
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 loginpage">
            <div className="bg-white p-3 rounded w-25 border" >
                <div className='text-danger'>
                    {error && error}
                </div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder="Enter Email" name="email" onChange={e => setValues({ ...values, email: e.target.value })} className="form-control rounded-0" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder="Enter Password" name="password" onChange={e => setValues({ ...values, password: e.target.value })} className="form-control rounded-0" />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">Log in</button>
                    <p>You are agree to our term and policies</p>
                </form>
            </div>
        </div>
    )
}

export default Login