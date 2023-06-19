import React, { useState, useEffect, useContext } from 'react';
import { firestore } from "../firebaseConfig";
import { collection, query, getDocs } from 'firebase/firestore';
import EditPet from "./EditPet";
import DeletePet from "./DeletePet";
import Logout from "./authentication/Logout";
import {UserContext} from "./UserContext";
import "../styles/ViewPet.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import AddPet from "./AddPet";


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
			{/*<h1>Animalele tale</h1>*/}
			{pets.length === 0 ? (
				<p>Nu ai adăugat animale.</p>
			) : (
				<div className="view-pets">
					<div className="names-pets">
						<h2>Animalele mele</h2>
						{pets.map((pet) => (
								<button key={pet.petId} className="pet-card">
									<h3><FontAwesomeIcon className="icon" icon={faPaw}/>{pet.petName}</h3>
								</button>
							))}
					</div>
					<div className="helper">
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
					</div>
					<div className="info-pet">
						{pets.map((pet) => (
							<li key={pet.petId}>
								<h3>{pet.petName}</h3>
							</li>
						))}
					</div>
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
