import { useState } from 'react';
import * as usersService from '../../utilities/users-service';
import { useAuth } from '../../contexts/AuthProvider';

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
        <div>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='username' className='form-label'>
                            Username
                        </label>
                        <input
                            className='form-control'
                            type='text'
                            name='username'
                            value={form.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email' className='form-label'>
                            Email
                        </label>
                        <input
                            className='form-control'
                            type='email'
                            name='email'
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Password</label>
                        <input
                            className='form-control'
                            type='password'
                            name='password'
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Confirm Password</label>
                        <input
                            className='form-control'
                            type='password'
                            name='confirmPassword'
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <button
                            className='btn btn-primary'
                            type='submit'
                            disabled={disable}>
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
            <p className='error-message'>{error}</p>
        </div>
    );
}
