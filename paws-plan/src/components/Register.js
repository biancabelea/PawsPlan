import React, { useState } from 'react';
import { auth } from '../firebaseConfig';

const Register = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleRegister = async (e) => {
		e.preventDefault();

		try {
			await auth.createUserWithEmailAndPassword(email, password);
			console.log('Registered successfully!');
			setEmail('');
			setPassword('');
		} catch (error) {
			console.error('Error registering:', error);
		}
	};

	return (
		<div>
			<h2>Register</h2>
			<form onSubmit={handleRegister}>
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
				<button type="submit">Register</button>
			</form>
		</div>
	);
};

export default Register;
