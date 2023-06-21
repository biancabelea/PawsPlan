import React, { useState, useEffect, useContext } from 'react';
import { firestore } from "../firebaseConfig";
import { collection, query, getDocs } from 'firebase/firestore';
import {UserContext} from "./UserContext";
import "../styles/ViewPet.css";
import PetNames from "./PetNames";
import MedForPet from "./MedForPet";
import PetDetails from "./PetDetails";

const ViewPets = () => {
	const { userId } = useContext(UserContext);

	const [pets, setPets] = useState([]);
	const [selectedPet, setSelectedPet] = useState(null);

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

	const handleSelectPet = (pet) => {
		setSelectedPet(pet);
	};

	return (
		<div>
			{pets.length === 0 ? (
				<p>Nu ai adăugat animale.</p>
			) : (
				<div className="view-pets">
					<PetNames onSelectPet={handleSelectPet}/>
					<MedForPet/>
					<PetDetails selectedPet={selectedPet}/>
				</div>
			)}
		</div>
	);
};

export default ViewPets;
