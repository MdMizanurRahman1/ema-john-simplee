import React, { useContext, useState } from 'react';
import './SignUp.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const SignUp = () => {
    const { createUser } = useContext(AuthContext);

    const [error, setError] = useState('');
    const handleSignUp = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        console.log(email, confirm, password);

        setError('');
        if (password !== confirm) {
            setError('Your password not matched')
            return;
        }
        else if (password.length < 6) {
            setError('password must be at least 6 characters')
            return;
        }
        createUser(email, password)
            .then((result) => {
                const loggedUser = result.user;
                console.log(loggedUser);

            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);

            });
    }


    return (
        <div className='form-container'>
            <h3 className='form-title'>Sign up</h3>
            <form onSubmit={handleSignUp}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" required />
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" required />
                </div>
                <div className='form-control'>
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" name="confirm" id="confirm" required />
                </div>
                <input className='btn-submit' type="submit" value="Signup" />
            </form>
            <p><small>Already have an account? <Link to='/login'>Login</Link></small></p>
            <p className='text-error'>{error}</p>
        </div>

    );
};

export default SignUp;