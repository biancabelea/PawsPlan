import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { firestore } from "../firebaseConfig";
import { doc, updateDoc } from 'firebase/firestore';
import '../styles/EditPet.css';
import Swal from 'sweetalert2';

const EditPet = () => {
	const userId = sessionStorage.getItem('userId');

	const navigate = useNavigate();

	const location = useLocation();
	const { petName, age, breed } = location.state;
	const searchParams = new URLSearchParams(location.search);
	const petId = searchParams.get('petId');

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
				confirmButtonColor: '#180026FF',
				cancelButtonColor: '#8B0000FF',
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

				navigate('/my-pets');
			}
		} catch (error) {
			console.error("Eroare la actualizarea animalului.", error);
		}
	};

	return (
		<div className="content-editpet">
			<h1>Editează animal</h1>
			<form className="editpet-form" onSubmit={handleUpdate}>
				<div className="editpet-label">
					<p>Numele animalului: </p>
					<input
						type="text"
						className="editpet-input"
						value={editedPetName}
						onChange={(e) => setEditedPetName(e.target.value)}
					/>
				</div>
				<div className="editpet-label">
					<p>Vârsta animalului: </p>
					<input
						type="number"
						className="editpet-input"
						value={editedAge}
						onChange={(e) => setEditedAge(e.target.value)}
					/>
				</div>
				<div className="editpet-label">
					<p>Rasa animalului: </p>
					<input
						type="text"
						className="editpet-input"
						value={editedBreed}
						onChange={(e) => setEditedBreed(e.target.value)}
					/>
				</div>
				<button className="editpet-button" type="submit">Salvează</button>
			</form>
		</div>
	);
};

export default EditPet;
