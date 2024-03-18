import { useState } from 'react';
// import { signUp } from '../../utilities/users-service';
import supabase from '../../config/supabaseClient';

export function SignUpForm({ setUser }) {
    const [error, setError] = useState(null);
    async function signUpWithSupabase(userData) {
        try {
            const { data } = await supabase.auth.signUp({
                email: userData.email,
                password: userData.password,
                options: {
                    data: {
                        username: userData.username,
                    },
                },
            });
            setUser(data);
        } catch (error) {
            setError('An error occurred with the sign up.');
            console.error('Error', error);
        }
    }

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
            const user = await signUpWithSupabase(userData);
            if (user !== null) {
                console.log(user);
                setUser(user);
            } else {
                setError('Sign up failed. Please try again');
            }
        } catch (error) {
            setError('An error occurred with the sign up.');
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
