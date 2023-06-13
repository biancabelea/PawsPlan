import React, { useState } from 'react';
import { auth } from '../../firebaseConfig';
import firebase from "firebase/compat/app";

const Register = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [registeredEmail, setRegisteredEmail] = useState('');

	const handleRegister = async (e) => {
		e.preventDefault();

		try {
			const userCredential = await auth.createUserWithEmailAndPassword(email, password);
			const user = userCredential.user;

			const userRef = firebase.firestore().collection('users').doc(user.uid);
			const userData = {
				// displayName: user.displayName,
				email: user.email
			};
			await userRef.set(userData);
			console.log('Registered successfully!', user.email);

			setRegisteredEmail(email);
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
			{registeredEmail && (
				<p>Registered as: {registeredEmail}</p>
			)}
		</div>
	);
};

export default Register;
