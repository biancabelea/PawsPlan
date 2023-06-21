import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "./UserContext";
import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import "../styles/ViewPet.css";

const PetNames = ({ onSelectPet }) => {
	const { userId } = useContext(UserContext);

	const [pets, setPets] = useState([]);

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

	const handleSelectPet = (selectedPetId) => {
		onSelectPet(selectedPetId);
	};

	return (
		<div className="names-pets">
			<h2>Animalele mele</h2>
			{pets.map((pet) => (
				<button key={pet.petId} className="pet-card" onClick={() => handleSelectPet(pet)}>
					<h3><FontAwesomeIcon className="icon" icon={faPaw} />{pet.petName}</h3>
				</button>
			))}
		</div>
	);
};

export default PetNames;
