import React from 'react';
import { auth } from '../../firebaseConfig';
import "../../styles/Logout.css";
import {useNavigate} from "react-router-dom";

const Logout = () => {
	const userId = sessionStorage.getItem('userId');

	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await auth.signOut();
			console.log('Log out cu succes!');
			sessionStorage.clear();
			navigate('/');
		} catch (error) {
			console.error('Eroare la log out:', error);
		}
	};

	return (
		<div>
			{userId && (
				<button className="logout-button" onClick={handleLogout}>Log Out</button>
			)}
		</div>
	);
};

export default Logout;
