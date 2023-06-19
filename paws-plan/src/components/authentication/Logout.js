import React, {useContext} from 'react';
import { auth } from '../../firebaseConfig';
import {UserContext} from "../UserContext";
import "../../styles/Logout.css";

const Logout = () => {
	const { resetUserContext } = useContext(UserContext);
	const { userId } = useContext(UserContext);

	const handleLogout = async () => {
		try {
			await auth.signOut();
			console.log('Log out cu succes!');
			resetUserContext();
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
