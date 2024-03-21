import { useState } from 'react';
import * as usersService from '../../utilities/users-service';
import { useAuth } from '../../contexts/AuthProvider';
import { Link } from 'react-router-dom';

export function SignUpForm() {
    const { setUser } = useAuth()
    const [error, setError] = useState(null);

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = {
            username: form.username,
            email: form.email,
            password: form.password,
        };
        try {
            const user = await usersService.signUp(userData);
            setUser(user);
        } catch (error) {
            setError(error.message);
        }
    };

    const disable =
        !form.username ||
        !form.email ||
        !form.password ||
        form.password !== form.confirmPassword;

    return (
        <div className='col-md-9 py-md-5 px-md-0 px-4 py-4 bg-dark-green d-flex flex-column align-items-center rounded'>
            <div className='form-container col-md-9'>
                <div className="text-white fs-2 mb-1 fw-semibold">Get Started with Eden</div>
                <p className='mb-4 fw-light text-white'>Sign up in one easy step</p>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3 form-floating '>
                        <input
                            className=' form-control'
                            placeholder='Username'
                            type='text'
                            name='username'
                            value={form.username}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className='mb-3 form-floating '>
                        <input
                            placeholder='Email'
                            className='form-control'
                            type='email'
                            name='email'
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className='mb-3 form-floating '>
                        <input
                            placeholder='Password'
                            className='form-control'
                            type='password'
                            name='password'
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className='mb-3 form-floating '>
                        <input
                            placeholder='Confirm Password'
                            className='form-control'
                            type='password'
                            name='confirmPassword'
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <label>Confirm Password</label>
                    </div>
                    <div>
                        <button
                            className='mb-4 btn btn-primary w-100'
                            type='submit'
                            disabled={disable}>
                            Sign up
                        </button>
                    </div>
                </form>
                <p className='error-message'>{error}</p>
                <p className='mb-4 fw-light text-white align-self-start'>Already have an account? <Link to='/login' className='text-decoration-none text-light-blue fw-semibold '>Log in!</Link></p>
            </div>
        </div>
    );
}
