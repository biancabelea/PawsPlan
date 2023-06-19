import React, { useState } from 'react';
import { firestore } from "../firebaseConfig";
import { collection, addDoc, doc } from 'firebase/firestore';
import Logout from "./authentication/Logout";

const AddPet = (props) => {
	const [petName, setPetName] = useState('');
	const [petAge, setPetAge] = useState(0);
	const [breed, setBreed] = useState('');

	const addPet = async (e) => {
		e.preventDefault();
		if (petName !== "") {
			try {
				const userDocRef = doc(firestore, "users", props.userId);
				const petsCollectionRef = collection(userDocRef, "pets");
				const petDocRef = await addDoc(petsCollectionRef, {
					petName: petName,
					age: petAge,
					breed: breed,
				});

				setPetName("");
				setPetAge(0);
				setBreed("");
				console.log('Animalul a fost adăugat cu succes!');
			} catch (error) {
				console.error('Eroare la adaugarea animalului: ', error);
			}
		}
	}

	return (
		<div>
			<h1>Adaugă un animal</h1>
			<form onSubmit={addPet}>
				<div className="input-container">
					<p>Care e numele animalului?</p>
					<input type="text"
						   value={petName}
						   onChange={(e) => setPetName(e.target.value)}
					/>
				</div>
				<div className="input-container">
					<p>Care e vârsta animalului?</p>
					<input type="number"
						   value={petAge}
						   onChange={(e) => setPetAge(e.target.value)}
					/>
				</div>
				<div className="input-container">
					<p>Ce rasă e animalul?</p>
					<input type="text"
						   value={breed}
						   onChange={(e) => setBreed(e.target.value)}
					/>
				</div>
				<div className="btn-container">
					<button>Adaugă animal</button>
				</div>
			</form>
		</div>
	)
};

export default AddPet;
