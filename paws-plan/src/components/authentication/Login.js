import React, { useState } from 'react';
import { auth } from '../../firebaseConfig';
import Logout from "./Logout";

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loggedEmail, setLoggedEmail] = useState('');
	const [loggedPassword, setLoggedPassword] = useState('');
	const [loggedIn, setLoggedIn] = useState(false)

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			await auth.signInWithEmailAndPassword(email, password);
			console.log('Log in cu succes!');
			setLoggedEmail(email);
			setLoggedPassword(password);
			setEmail('');
			setPassword('');
			setLoggedIn(true);
		} catch (error) {
			console.error('Eroare la log in:', error);
		}
	};

	return (
		<div>
			{loggedIn ? (
				<div>
					<h2>Bine ai venit, {loggedEmail}!</h2>
					<Logout/>
				</div>
			) : (
				<div>
					<h2>Log In</h2>
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
			)}
		</div>
	)
};

export default Login;
