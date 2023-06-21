import React, { useState, useEffect, useContext } from 'react';
import {UserContext} from "./UserContext";
import {collection, getDocs, query} from "firebase/firestore";
import {firestore} from "../firebaseConfig";
import "../styles/ViewPet.css"
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';

const MedForPet = ({selectedPet, medications}) => {
	const { userId } = useContext(UserContext);
	const navigate = useNavigate();

	const handleAddMedication = () => {
		navigate('/add-medication');
	}

	if (!selectedPet) {
		return <p>Select a pet to view medications.</p>;
	}

	return (
		<div className="meds">
			<div className="header">
				<h2>Medicația lui {selectedPet.petName}</h2>
				<button className="addmed"
						onClick={handleAddMedication}>
					<FontAwesomeIcon className="icon" icon={faPlus}/>
				</button>
			</div>
			<div className="med-pets">
				{medications.map((medication) => (
					<div key={medication.medId}>
						<p>Nume medicație: {medication.medName}</p>
						<p>Dozaj: {medication.dosage}</p>
						<p>Timestamp: {medication.timestamp.toDate().toString()}</p>
						<button className="deletemed"><FontAwesomeIcon className="icon" icon={faTrash}/></button>
					</div>
				))}
			</div>
		</div>
	)
}

export default MedForPet;
