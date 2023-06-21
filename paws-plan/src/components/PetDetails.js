import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faHeart } from "@fortawesome/free-solid-svg-icons";
import "../styles/ViewPet.css";

const PetDetails = ({selectedPet}) => {
	if (!selectedPet) {
		return <p>Apasă pe numele unui animal pentru detalii.</p>;
	}

	return (
		<div className="info-pet">
			<div className="info">
				<h2>{selectedPet.petName}</h2>
				<div className="info-card">
					<p><FontAwesomeIcon className="icon" icon={faCalendarDays}/>Vârsta: {selectedPet.age}</p>
					<p><FontAwesomeIcon className="icon" icon={faHeart}/>Rasa: {selectedPet.breed}</p>
				</div>
				<div className="animal-buttons">
					<button>Edit</button>
					<button>Delete</button>
				</div>
			</div>

		</div>
	)
}

export default PetDetails;
