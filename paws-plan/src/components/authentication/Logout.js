import React, {useContext} from 'react';
import { auth } from '../../firebaseConfig';
import {UserContext} from "../UserContext";

const Logout = ({userId}) => {
	const { resetUserContext } = useContext(UserContext);

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
				<button onClick={handleLogout}>Log Out</button>
			)}
		</div>
	);
};

export default Logout;
