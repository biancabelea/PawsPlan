import React, { useState, useEffect, useContext } from 'react';
import {UserContext} from "./UserContext";
import {collection, getDocs, query} from "firebase/firestore";
import {firestore} from "../firebaseConfig";
import "../styles/ViewPet.css"

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
			<h2>Medicația lui jygvyutfvuybi</h2>
			<div className="med-pets">
				{pets.map((pet) => (
					<button key={pet.petId} className="med-card">
						<h3>{pet.petName}</h3>
						<p>Vârsta: {pet.age}</p>
						<p>Rasa: {pet.breed}</p>
					</button>
				))}
			</div>
		</div>
	)
}

export default MedForPet;
