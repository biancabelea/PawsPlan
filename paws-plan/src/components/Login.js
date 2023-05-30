import React, { useState } from 'react';
import { auth } from '../firebaseConfig';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			await auth.signInWithEmailAndPassword(email, password);
			console.log('Logged in successfully!');
			setEmail('');
			setPassword('');
		} catch (error) {
			console.error('Error logging in:', error);
		}
	};

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">Log In</button>
			</form>
		</div>
	);
};

export default Login;
