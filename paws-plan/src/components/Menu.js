import React, {useContext} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBone } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import "../styles/Menu.css";
import {UserContext} from "./UserContext";
import Logout from "./authentication/Logout";
import {ReactComponent as Logo} from "../pictures/logo.svg"

const Menu = () => {
	const { userId } = useContext(UserContext);
	const { ownerName } = useContext(UserContext);

	return (
		<menu className="menu">
			<Logo className="logo"/>
			<div className="welcome"><h1>Bine ai venit, <br/> {ownerName}!</h1></div>
			<div className="menu-contents">
				<a href="/"><FontAwesomeIcon className="icon" icon={faBone}/>Animalele mele</a><br/>
				<a href="/add-pet"><FontAwesomeIcon className="icon" icon={faPlus}/>Adaugă un animal</a><br/>
				<Logout/>
			</div>
		</menu>
	)
}

export default Menu;
