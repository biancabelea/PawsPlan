import React, { useState } from 'react';
import { firestore } from "../firebaseConfig";
import { doc, updateDoc } from 'firebase/firestore';
import {useLocation, useNavigate} from "react-router-dom";
import Swal from 'sweetalert2';


const EditPet = () => {
	const userId = sessionStorage.getItem('userId');

	const location = useLocation();
	const { petName, age, breed } = location.state;
	const searchParams = new URLSearchParams(location.search);

	const petId = searchParams.get('petId');

	const navigate = useNavigate();

	const [editedPetName, setEditedPetName] = useState(petName);
	const [editedAge, setEditedAge] = useState(age);
	const [editedBreed, setEditedBreed] = useState(breed);

	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			const confirmed = await Swal.fire({
				title: 'Confirmare',
				text: 'Ești sigur că vrei să actualizezi animalul?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Da',
				cancelButtonText: 'Anulează'
			});

			if (confirmed.isConfirmed) {
				const petDocRef = doc(firestore, "users", userId, "pets", petId);
				await updateDoc(petDocRef, {
					petName: editedPetName,
					age: editedAge,
					breed: editedBreed
				});
				console.log("Animalul a fost actualizat cu succes!");
				navigate('/my-pets');
			}
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
