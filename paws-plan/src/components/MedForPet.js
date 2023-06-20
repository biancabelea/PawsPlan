import React, { useState, useEffect, useContext } from 'react';
import {UserContext} from "./UserContext";
import {collection, getDocs, query} from "firebase/firestore";
import {firestore} from "../firebaseConfig";
import "../styles/ViewPet.css"
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const MedForPet = () => {
	const { userId } = useContext(UserContext);
	const { ownerName } = useContext(UserContext);

	const [pets, setPets] = useState([]);
	const [selectedPetId, setSelectedPetId] = useState(null);

	useEffect(() => {
		const fetchPets = async () => {
			try {
				const petsQuery = query(collection(firestore, "users", userId, "pets"));
				const petsSnapshot = await getDocs(petsQuery);
				const petsData = petsSnapshot.docs.map((doc) => {
					const data = doc.data();
					return {
						petId: doc.id,
						petName: data.petName,
						age: data.age,
						breed: data.breed
					};
				});
				setPets(petsData);
			} catch (error) {
				console.error("Eroare la afișarea animalelor.", error);
			}
		}
		fetchPets();
	}, [userId]);

	return (
		<div className="meds">
			<div className="header">
				<h2>Medicația lui jygvyutfvuybi</h2>
				<button className="addmed"><FontAwesomeIcon className="icon" icon={faPlus}/></button>
			</div>
			<div className="med-pets">
				{pets.map((pet) => (
					<div key={pet.petId} className="med-card">
						<h3>{pet.petName}</h3>
						<p>Vârsta: {pet.age}</p>
						<p>Rasa: {pet.breed}</p>
						<button className="deletemed"><FontAwesomeIcon className="icon" icon={faTrash}/></button>
					</div>
				))}
			</div>
		</div>
	)
}

export default MedForPet;
