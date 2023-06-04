import React, { useState, useEffect } from 'react';
import { firestore } from "../firebaseConfig";
import { collection, query, where, getDocs } from 'firebase/firestore';

const ViewPets = (props) => {
	const [pets, setPets] = useState([]);

	useEffect(() => {
		const fetchPets = async () => {
			try {
				const petsQuery = query(collection(firestore, "users", props.userId, "pets"));
				const petsSnapshot = await getDocs(petsQuery);
				const petsData = petsSnapshot.docs.map((doc) => doc.data());
				setPets(petsData);
			} catch (error) {
				console.error("Eroare la afișarea animalelor.", error);
			}
		}
		fetchPets();
	}, [props.userId]);

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
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default ViewPets;
