import {  useState } from 'react';
import * as usersService from '../../utilities/users-service'
import { useAuth } from '../../contexts/AuthProvider';
import { Link } from 'react-router-dom';

export function LoginForm() {
    const { setUser } = useAuth()
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState(null);
    
    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const loginData = form;
            const user = await usersService.login(loginData);
            setUser(user)
        } catch (error) {
            setError(error.message);
        }
    };

    const disable = !form.email || !form.password;

    return (
        <div className='col-md-9 py-md-5 px-md-0 px-4 py-4 bg-dark-green d-flex flex-column align-items-center rounded'>
            <div className='form-container col-md-9'>
                <div className="text-white mb-1 fs-2 fw-semibold">Welcome Back</div>
                <p className='mb-4 fw-light text-white'>Log in to your account</p>
                <form autoComplete='off' onSubmit={handleSubmit}>
                    <div className='mb-3 form-floating '>
                        <input
                            className='form-control'
                            type='text'
                            name='email'
                            value={form.email}
                            onChange={handleChange}
                            placeholder='Email'
                            required
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className='mb-4 form-floating '>
                        <input
                            className='form-control'
                            type='password'
                            name='password'
                            value={form.password}
                            onChange={handleChange}
                            placeholder='Password'
                            required
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button
                        className='btn btn-primary w-100 mb-4'
                        type='submit'
                        disabled={disable}>
                        Log In
                    </button>
                </form>
                <p className='error-message'>{error}</p>
                <p className='mb-4 fw-light text-white align-self-start'>Don't have an account? <Link to='/signup' className='text-decoration-none text-light-blue fw-semibold '>Sign up!</Link></p>
            </div>
        </div>
    );
}
