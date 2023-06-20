import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "./UserContext";
import {collection, getDocs, query} from "firebase/firestore";
import {firestore} from "../firebaseConfig";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarDays, faHeart} from "@fortawesome/free-solid-svg-icons";
import "../styles/ViewPet.css"

const PetDetails = () => {
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
		<div className="info-pet">
			<div className="info">
				<h2>Nume animal selectat</h2>
				<div className="info-card">
					<p><FontAwesomeIcon className="icon" icon={faCalendarDays}/>Vârsta: 3 ani</p>
					<p><FontAwesomeIcon className="icon" icon={faHeart}/>Rasa: Bichon</p>
				</div>
				<div className="animal-buttons">
					<button>Edit</button>
					<button>Delete</button>
				</div>
			</div>

		</div>
	)
}

export default PetDetails;
