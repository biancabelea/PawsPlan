import React, { useState, useEffect} from 'react';
import { firestore } from "../firebaseConfig";
import { collection, query, getDocs } from 'firebase/firestore';
import "../styles/ViewPet.css";
import PetNames from "./PetNames";
import MedForPet from "./MedForPet";
import PetDetails from "./PetDetails";

const ViewPets = () => {
	const userId = sessionStorage.getItem('userId');

	const [pets, setPets] = useState([]);
	const [selectedPet, setSelectedPet] = useState(null);
	const [medications, setMedications] = useState([]);

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
				if (petsData.length > 0) {
					setSelectedPet(petsData[0]);
				}
			} catch (error) {
				console.error("Eroare la afișarea animalelor.", error);
			}
		}
		fetchPets();
	}, [userId]);

	useEffect(() => {
		const fetchMedications = async () => {
			try {
				if (selectedPet) {
					const medicationsRef = collection(firestore, 'users', userId, 'pets', selectedPet.petId, 'medication');
					const medicationsQuery = query(medicationsRef);
					const medicationsSnapshot = await getDocs(medicationsQuery);
					const medicationsData = medicationsSnapshot.docs.map((doc) => {
						const data = doc.data();
						return {
							medId: doc.id,
							medName: data.medName,
							dosage: data.dosage,
							timestamp: data.timestamp,
						};
					});
					console.log('Medications:', medicationsData);
					setMedications(medicationsData);
				}
			} catch (error) {
				console.error('Eroare la afișarea medicatiilor!', error);
			}
		};

		fetchMedications();
	}, [userId, selectedPet]);

	const handleSelectPet = (pet) => {
		setSelectedPet(pet);
	};

	return (
		<div>
			{pets.length === 0 ? (
				<h1 className="not-exist">Nu ai adăugat animale.</h1>
			) : (
				<div className="view-pets">
					<PetNames onSelectPet={handleSelectPet}/>
					<MedForPet selectedPet={selectedPet} medications={medications}/>
					<PetDetails selectedPet={selectedPet}/>
				</div>
			)}
		</div>
	);
};

export default ViewPets;
