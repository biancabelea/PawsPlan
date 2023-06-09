import React from "react";
import Logout from "./authentication/Logout";
import "../styles/Menu.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBone, faPlus, faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Logo } from "../pictures/logo.svg";

const Menu = () => {
	const ownerName = sessionStorage.getItem('ownerName');

	return (
		<menu className="menu">
			<Logo className="logo"/>
			<div className="welcome"><h1>Bine ai venit, <br/> {ownerName}!</h1></div>
			<div className="menu-contents">
				<a  href="/my-pets"><FontAwesomeIcon className="icon" icon={faBone}/>Animalele mele</a><br/>
				<a href="/add-pet"><FontAwesomeIcon className="icon" icon={faPlus}/>Adaugă un animal</a><br/>
				<a href="/vets"><FontAwesomeIcon className="icon" icon={faUserDoctor}/>Cabinete veterinare</a><br/>
				<Logout/>
			</div>
		</menu>
	)
}

export default Menu;
