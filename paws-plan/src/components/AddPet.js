import React, { useState, useContext } from 'react';
import { firestore } from "../firebaseConfig";
import { collection, addDoc, doc } from 'firebase/firestore';
import {UserContext, UserProvider} from "./UserContext";
import Menu from "./Menu";
import ViewPets from "./ViewPets";
import "../styles/Menu.css";
import "../styles/AddPet.css";

const AddPet = () => {
	const { userId } = useContext(UserContext);

	const [petName, setPetName] = useState('');
	const [petAge, setPetAge] = useState(0);
	const [breed, setBreed] = useState('');

	const addPet = async (e) => {
		e.preventDefault();
		if (petName !== "") {
			try {
				console.log("++++++", userId);
				const userDocRef = doc(firestore, "users", userId);
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
		<UserProvider>
			<div className="body-container">
				<Menu/>
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
								    value={petAge}
								    onChange={(e) => setPetAge(e.target.value)}
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
		</UserProvider>
	)
};

export default AddPet;
