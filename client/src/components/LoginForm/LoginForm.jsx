import {  useState } from 'react';
import * as usersService from '../../utilities/users-service'

export function LoginForm({ user, setUser }) {
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
            console.error(error);
            setError(error.message);
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
