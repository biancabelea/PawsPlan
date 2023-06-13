import React from 'react';
import { auth } from '../../firebaseConfig';

const Logout = ({userId}) => {
	const handleLogout = async () => {
		try {
			await auth.signOut();
			console.log('Log out cu succes!');
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
