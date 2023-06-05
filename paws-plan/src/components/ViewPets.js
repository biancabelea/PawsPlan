import React, { useState, useEffect } from 'react';
import { firestore } from "../firebaseConfig";
import { collection, query, getDocs } from 'firebase/firestore';
import EditPet from "./EditPet";
import DeletePet from "./DeletePet";

const ViewPets = (props) => {
	const [pets, setPets] = useState([]);
	const [selectedPetId, setSelectedPetId] = useState(null);

	useEffect(() => {
		const fetchPets = async () => {
			try {
				const petsQuery = query(collection(firestore, "users", props.userId, "pets"));
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
	}, [props.userId]);

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
			<h1>Animalele tale</h1>
			{pets.length === 0 ? (
				<p>Nu ai adăugat animale.</p>
			) : (
				<ul>
					{pets.map((pet) => (
						<li key={pet.petId}>
							<h3>{pet.petName}</h3>
							<p>Vârsta: {pet.age}</p>
							<p>Rasa: {pet.breed}</p>
							{selectedPetId === pet.petId ? (
								<EditPet
									userId={props.userId}
									petId={pet.petId}
									petName={pet.petName}
									age={pet.age}
									breed={pet.breed}
									onCancelEdit={handleCancelEditPet}
								/>
							) : (
								<>
									<button onClick={() => handleEditPet(pet.petId)}>
										Editează animalul</button>
									<DeletePet
										userId={props.userId}
										petId={pet.petId}
										onDelete={handleDeletePet}
									/>
								</>
							)
							}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default ViewPets;