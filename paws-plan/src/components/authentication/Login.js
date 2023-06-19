import React, {useContext, useState} from 'react';
import { auth, firestore } from '../../firebaseConfig';
import Logout from "./Logout";
import '../../styles/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {ReactComponent as DoctorPic} from "../../pictures/undraw_doctors.svg"
import {ReactComponent as DogPic} from "../../pictures/undraw_dog.svg";
import { useNavigate } from 'react-router-dom';
import {UserContext} from "../UserContext";


const Login = () => {
	const { setUserId, setOwnerName } = useContext(UserContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loggedEmail, setLoggedEmail] = useState('');
	const [loggedIn, setLoggedIn] = useState(false);

	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const {user} = await auth.signInWithEmailAndPassword(email, password);
			const userRef = firestore.collection('users').doc(user.uid);
			const userDoc = await userRef.get();

			if (userDoc.exists) {
				const userData = userDoc.data();
				const ownerName = userData.ownerName;

				console.log('Log in cu succes!');
				setOwnerName(ownerName);
				setLoggedEmail(email);
				setEmail('');
				setPassword('');
				setLoggedIn(true);
				const userId = user.uid;
				setUserId(userId);

				navigate('/');
			}

		} catch (error) {
			console.error('Eroare la log in:', error);
		}
	};

	return (
		<div className="login-container">
			<DoctorPic className="doctor-photo"/>
			<DogPic className="dog-photo"/>
			{loggedIn ? (
				<div>
					<h2>Bine ai venit, {loggedEmail}!</h2>
				</div>
			) : (
				<div className="login-content">
					<div><h2>Conectare</h2></div>
					<form onSubmit={handleLogin} className="login-form">
						<div className="login-label">
							<FontAwesomeIcon icon={faEnvelope}/>
							<input
								className="login-input"
								type="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="login-label">
							<FontAwesomeIcon icon={faLock}/>
							<input
								className="login-input"
								type="password"
								placeholder="Parola"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<button className="login-button" type="submit">CONECTARE</button>
					</form>
				</div>
			)}
		</div>
	)
};

export default Login;
