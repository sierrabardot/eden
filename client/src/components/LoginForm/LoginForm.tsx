import React, { FormEvent, ChangeEvent, useState } from 'react';
import { Props, User } from '../../types/userTypes';
import { login } from '../../utilities/users-service';

export function LoginForm({ setUser }: Props) {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState<string | null>(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const loginData = form;
            const user: User | null = await login(loginData);
            if (user !== null) {
                setUser(user);
            } else {
                setError('Sign up failed. Please try again');
            }
        } catch (error) {
            console.error(error);
            setError('Incorrect username or password.');
        }
    };

    const disable = !form.email || !form.password;

    return (
        <div>
            <div className='form-container'>
                <form autoComplete='off' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label className='form-label'>Email</label>
                        <input
                            className='form-control'
                            type='text'
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
                        <button
                            className='btn btn-primary'
                            type='submit'
                            disabled={disable}>
                            Log In
                        </button>
                    </div>
                </form>
            </div>
            <p className='error-message'>{error}</p>
        </div>
    );
}
