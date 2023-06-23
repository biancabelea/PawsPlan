import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import firebase from "firebase/compat/app";
import '../../styles/Register.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as MedicPic } from "../../pictures/undraw_medical.svg";
import { ReactComponent as CatPic } from "../../pictures/undraw_cat.svg";

const Register = () => {
	const navigate = useNavigate();

	const [name, setName] = useState('');
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
				ownerName: name,
				email: user.email
			};
			await userRef.set(userData);

			setRegisteredEmail(email);
			setEmail('');
			setPassword('');

			navigate('/login');
		} catch (error) {
			console.error('Eroare la înregistrarea utilizatorului:', error);
		}
	};

	return (
		<div className='register-container'>
			<MedicPic className="medic-photo"/>
			<CatPic className="cat-photo"/>
			<div className='register-content'>
				<div><h2>Înregistrare</h2></div>
				<form onSubmit={handleRegister} className='register-form'>
					<div className="register-label">
						<FontAwesomeIcon icon={faUser}/>
						<input
							className="register-input"
							type="text"
							placeholder="Nume"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="register-label">
						<FontAwesomeIcon icon={faEnvelope}/>
						<input
							className="register-input"
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="register-label">
						<FontAwesomeIcon icon={faLock}/>
						<input
							className="register-input"
							type="password"
							placeholder="Parola"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button className="register-button" type="submit" onClick={handleRegister}>ÎNREGISTRARE</button>
				</form>
			</div>
			{registeredEmail && (
				<p>Registered as: {registeredEmail}</p>
			)}
		</div>
	);
};

export default Register;
