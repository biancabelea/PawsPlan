import React, {useState} from "react";
import Register from "./authentication/Register";
import Login from "./authentication/Login";
import { useNavigate } from 'react-router-dom';

const Homepage = ({loggedUserName}) => {
	const [userId, setUserId] = useState(null);

	const navigate = useNavigate();

	const handleLoginClick = () => {
		navigate('/login');
	};

	const handleRegisterClick = () => {
		navigate('/register');
	};

	return (
		<div>
			<h1>welcome</h1>
			<button onClick={handleLoginClick}>Go to Login</button>
			<button onClick={handleRegisterClick}>Go to Register</button>
		</div>
	)
}

export default Homepage;
