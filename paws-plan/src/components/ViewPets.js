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

	const handleEditPet = (petId) => {
		setSelectedPetId(petId);
	};

	const handleCancelEditPet = () => {
		setSelectedPetId(null);
	};

	const handleDeletePet = (petId) => {
		setPets((prevPets) => prevPets.filter((pet) => pet.petId !== petId));
	};

	return (
		<div>
			{pets.length === 0 ? (
				<p>Nu ai adăugat animale.</p>
			) : (
				<div className="view-pets">
					<PetNames/>
					<MedForPet/>
					<PetDetails/>
				</div>
				// <ul>
				// 	{pets.map((pet) => (
				// 		<li key={pet.petId}>
				// 			<h3>{pet.petName}</h3>
				// 			<p>Vârsta: {pet.age}</p>
				// 			<p>Rasa: {pet.breed}</p>
				// 			{selectedPetId === pet.petId ? (
				// 				<EditPet
				// 					userId={userId}
				// 					petId={pet.petId}
				// 					petName={pet.petName}
				// 					age={pet.age}
				// 					breed={pet.breed}
				// 					onCancelEdit={handleCancelEditPet}
				// 				/>
				// 			) : (
				// 				<>
				// 					<button onClick={() => handleEditPet(pet.petId)}>
				// 						Editează animalul</button>
				// 					<DeletePet
				// 						userId={userId}
				// 						petId={pet.petId}
				// 						onDelete={handleDeletePet}
				// 					/>
				// 				</>
				// 			)
				// 			}
				// 		</li>
				// 	))}
				// </ul>
			)}
		</div>
	);
};

export default ViewPets;
