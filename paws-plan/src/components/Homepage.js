import React, {useContext, useState} from "react";
import { useNavigate,Route, Routes } from 'react-router-dom';
import {UserContext} from "./UserContext";
import Menu from "./Menu";
import ViewPets from "./ViewPets";
// import "../styles/Menu.css";
import "../styles/Homepage.css";
import AddPet from "./AddPet";
import {ReactComponent as Logo} from "../pictures/logo.svg";

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
