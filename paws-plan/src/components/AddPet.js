import React, { useState } from 'react';
import { firestore } from "../firebaseConfig";
import { collection, addDoc, doc } from 'firebase/firestore';
import Menu from "./Menu";
import "../styles/Menu.css";
import "../styles/AddPet.css";

const AddPet = ({userId}) => {
	const [petName, setPetName] = useState('');
	const [age, setAge] = useState(0);
	const [breed, setBreed] = useState('');

	const addPet = async (e) => {
		e.preventDefault();
		if (petName !== "") {
			try {
				const userDocRef = doc(firestore, "users", userId);
				const petsCollectionRef = collection(userDocRef, "pets");
				const petDocRef = await addDoc(petsCollectionRef, {
					age: age,
					breed: breed,
					petName: petName,
				});

				setPetName("");
				setAge(0);
				setBreed("");
				console.log('Animalul a fost adăugat cu succes!');
			} catch (error) {
				console.error('Eroare la adaugarea animalului: ', error);
			}
		}
	}

	return (
		<div className="body-container">
			<Menu />
			<div className="content-container">
				<div className="content">
					<h1>Adaugă un animal</h1>
					<form className="addpet-form" onSubmit={addPet}>
						<div className="addpet-label">
							<p>Care e numele animalului?</p>
							<input
								className="addpet-input"
								type="text"
								value={petName}
								onChange={(e) => setPetName(e.target.value)}
							/>
						</div>
						<div className="addpet-label">
							<p>Care e vârsta animalului?</p>
							<input
								className="addpet-input"
								type="number"
								value={age}
								onChange={(e) => setAge(e.target.value)}
							/>
						</div>
						<div className="addpet-label">
							<p>Ce rasă e animalul?</p>
							<input
								className="addpet-input"
								type="text"
								value={breed}
								onChange={(e) => setBreed(e.target.value)}
							/>
						</div>
						<div className="btn-container">
							<button className="addpet-button">Adaugă animal</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddPet;
