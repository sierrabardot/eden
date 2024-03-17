import React, { FormEvent, ChangeEvent, useState } from 'react';
import { Props } from '../../types/userTypes';

export function SignUpForm({ userStore }: Props) {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
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
        const userData = {
            name: form.name,
            email: form.email,
            password: form.password,
        };
        try {
            await userStore.signUp(userData);
        } catch (error: any) {
            setError('An error occurred with the sign up.');
        }
    };

    const disable: boolean =
        !form.name ||
        !form.email ||
        !form.password ||
        form.password !== form.confirmPassword;

    return (
        <div>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='name' className='form-label'>
                            Name
                        </label>
                        <input
                            className='form-control'
                            type='text'
                            name='name'
                            value={form.name}
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
