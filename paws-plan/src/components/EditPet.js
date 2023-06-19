import React, { useState } from 'react';
import { firestore } from "../firebaseConfig";
import { doc, updateDoc } from 'firebase/firestore';
import Logout from "./authentication/Logout";

const EditPet = ({userId, petId, petName, age, breed}) => {
	const [editedPetName, setEditedPetName] = useState(petName);
	const [editedAge, setEditedAge] = useState(age);
	const [editedBreed, setEditedBreed] = useState(breed);

	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			const petDocRef = doc(firestore, "users", userId, "pets", petId);
			await updateDoc(petDocRef, {
				petName: editedPetName,
				age: editedAge,
				breed: editedBreed
			});
			console.log("Animalul a fost actualizat cu succes!");
		} catch (error) {
			console.error("Eroare la actualizarea animalului.", error);
		}
	};

	return (
		<div>
			<form onSubmit={handleUpdate}>
				<h1>Editează animal</h1>
				<div>
					<label>Numele animalului: </label>
					<input
						type="text"
						value={editedPetName}
						onChange={(e) => setEditedPetName(e.target.value)}
					/>
				</div>
				<div>
					<label>Vârsta animalului: </label>
					<input
						type="number"
						value={editedAge}
						onChange={(e) => setEditedAge(e.target.value)}
					/>
				</div>
				<div>
					<label>Rasa animalului: </label>
					<input
						type="text"
						value={editedBreed}
						onChange={(e) => setEditedBreed(e.target.value)}
					/>
				</div>
				<button type="submit">Salvează</button>
			</form>
		</div>
	);
};

export default EditPet;
