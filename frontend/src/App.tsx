import React, { useState } from 'react';
import {login, register} from "./api/auth/UserService.ts";
import FetchItemsButton from "./FetchItemsButton.tsx";
// import { useHistory } from 'react-router-dom'; // For navigation

const App: React.FC = () => {
    // const history = useHistory();

    // States for form inputs and error messages
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [error, setError] = useState<string>('');
    const [isRegistering, setIsRegistering] = useState<boolean>(false); // Toggle between login and register form

    // Handle input change in the form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission (Login or Register)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (isRegistering) {
                // Register new user
                const response = await register(formData);
                console.log('Registration success:', response);

                // Optionally redirect or auto-login after registration
                // history.push('/login'); // Redirect to login after successful registration
            } else {
                // Log in existing user
                const response = await login(formData);
                console.log('Login success:', response);

                // Redirect to a protected route after login
                // history.push('/dashboard'); // Redirect to the protected dashboard page
            }

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setError(isRegistering ? 'Registration failed' : 'Login failed');
        }
    };

    return (
        <div>
            <h1>{isRegistering ? 'Register' : 'Login'}</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
            </form>

            {error && <p>{error}</p>}

            <button onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
            </button>
            <br/>
            <FetchItemsButton/>
        </div>
    );
};

export default App;
