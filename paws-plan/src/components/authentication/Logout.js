import React from 'react';
import { useNavigate } from "react-router-dom";
import { auth } from '../../firebaseConfig';
import "../../styles/Logout.css";

const Logout = () => {
	const userId = sessionStorage.getItem('userId');

	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await auth.signOut();
			sessionStorage.clear();
			navigate('/');
		} catch (error) {
			console.error('Eroare la log out:', error);
		}
	};

	return (
		<div>
			{userId && (
				<button className="logout-button" onClick={handleLogout}>Deconectare</button>
			)}
		</div>
	);
};

export default Logout;
