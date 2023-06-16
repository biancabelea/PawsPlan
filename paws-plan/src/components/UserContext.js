import {createContext, useState} from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [userId, setUserId] = useState('');
	const [ownerName, setOwnerName] = useState('');

	const resetUserContext = () => {
		setUserId('');
		setOwnerName('');
	};

	return (
		<UserContext.Provider value={{ userId, setUserId, ownerName, setOwnerName, resetUserContext }}>
			{children}
		</UserContext.Provider>
	);
};
