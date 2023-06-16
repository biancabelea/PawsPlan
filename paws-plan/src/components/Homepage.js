import React, {useContext, useState} from "react";
import Register from "./authentication/Register";
import Login from "./authentication/Login";
import { useNavigate } from 'react-router-dom';
import {UserContext} from "./UserContext";
import Logout from "./authentication/Logout";
import Menu from "./Menu";

const Homepage = ({loggedUserName}) => {
	const { userId } = useContext(UserContext);
	const { ownerName } = useContext(UserContext);

	const navigate = useNavigate();

	const handleLoginClick = () => {
		navigate('/login');
	};

	const handleRegisterClick = () => {
		navigate('/register');
	};

	return (
		<div>
			{userId ? (
				<div>
					{/*<h1>welcome {ownerName}</h1>*/}
					{/*<Logout userId={userId}/>*/}
					<Menu/>
				</div>
			) : (
			<div>
				{/*<button onClick={handleLoginClick}>Go to Login</button>*/}
				{/*<button onClick={handleRegisterClick}>Go to Register</button>*/}
				<Menu/>
			</div>
			)}
		</div>
	)
}

export default Homepage;
