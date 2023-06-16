import React, {useContext} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import "../styles/Menu.css";
import Content from "./Content";
import {useNavigate} from "react-router-dom";
import {UserContext} from "./UserContext";

const Menu = () => {
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
						<menu className="menu">
							<div className="welcome"><h1>Welcome, {ownerName}!</h1></div>
							<div className="menu-contents">
								<a href="/"><FontAwesomeIcon className="icon" icon={faLock}/>Upcoming</a><br/>
								<a href="/"><FontAwesomeIcon className="icon" icon={faLock}/>Upcoming</a><br/>
								<a href="/"><FontAwesomeIcon className="icon" icon={faLock}/>Upcoming</a><br/>
								<a href="/"><FontAwesomeIcon className="icon" icon={faLock}/>Upcoming</a><br/>
							</div>
						</menu>
						<div className="content-container">
							<Content/>
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

export default Menu;
