import React, { useState } from 'react';
import { firestore } from "../firebaseConfig";
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';

const AddPet = (props) => {
	const [petName, setPetName] = useState('');
	const [petAge, setPetAge] = useState(0);
	const [breed, setBreed] = useState('');

	const addPet = async (e) => {
		e.preventDefault();
		if (petName !== "") {
			try {
				const userRef = doc(firestore, "users", props.userId);
				const petDocRef = await addDoc(collection(userRef, "pets"), {
					petName: petName,
					age: petAge,
					breed: breed,
				});

				await setDoc(userRef, {pets: firestore.FieldValue.arrayUnion(petDocRef.id)}, {merge: true});

				console.log("animal adaugat", petName);
				setPetName("");
				setPetAge(0);
				setBreed("");
				console.log("animal adaugat", petName);
			} catch (error) {
				console.error('Eroare la adaugarea animalului: ', error);
			}
		}
	}

	return (
		<div>
			<h1>Add a pet</h1>
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
}

export default AddPet;
