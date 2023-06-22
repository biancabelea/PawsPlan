import React from "react";
import MyPets from "./MyPets";
import { useNavigate } from 'react-router-dom';
import "../styles/Homepage.css";
import {ReactComponent as Logo} from "../pictures/logo.svg";

const Homepage = () => {
	const userId = sessionStorage.getItem('userId');

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
				<MyPets/>
			) : (
			<div className="homepage">
				<div className="navbar">
					<div><Logo className="logo-image"/></div>
					<div className="user-buttons">
						<button className="user-login-button" onClick={handleLoginClick}>Conectare</button>
						<button className="user-register-button" onClick={handleRegisterClick}>Înregistrare</button>
					</div>
				</div>
				<div className="motto">
					<h1>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h1>
					<h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy</h3>
				</div>
			</div>
			)}
		</div>
	)
}

export default Homepage;
