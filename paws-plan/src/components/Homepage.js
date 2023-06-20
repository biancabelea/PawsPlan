import React, {useContext, useState} from "react";
import { useNavigate } from 'react-router-dom';
import {UserContext} from "./UserContext";
import Menu from "./Menu";
import ViewPets from "./ViewPets";
// import "../styles/Menu.css";
import "../styles/Homepage.css";

const Homepage = () => {
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
				<div className="body-container">
					<Menu/>
					<div className="content-container">
						<div className="content">
							<ViewPets/>
						</div>
					</div>
				</div>
			) : (
			<div>
				<button onClick={handleLoginClick}>Go to Login</button>
				<button onClick={handleRegisterClick}>Go to Register</button>
			</div>
			)}
		</div>
	)
}

export default Homepage;
