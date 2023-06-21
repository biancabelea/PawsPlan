import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faHeart } from "@fortawesome/free-solid-svg-icons";
import "../styles/ViewPet.css";
import {deleteDoc, doc} from "firebase/firestore";
import {firestore} from "../firebaseConfig";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {useNavigate} from "react-router-dom";

const PetDetails = ({selectedPet}) => {
	const userId = sessionStorage.getItem('userId');
	const navigate = useNavigate();

	const handleDelete = () => {
		const MySwal = withReactContent(Swal);

		MySwal.fire({
			title: 'Ești sigur că vrei să ștergi animalul?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#180026FF',
			cancelButtonColor: '#8B0000FF',
			confirmButtonText: 'OK',
			cancelButtonText: 'Anulare'
		}).then((result) => {
			if (result.isConfirmed) {
				deletePet();
			}
		});
	};

	const deletePet = async () => {
		try {
			const petDocRef = doc(firestore, 'users', userId, 'pets', selectedPet.petId);
			await deleteDoc(petDocRef);
			window.location.reload();
			console.log('Animalul a fost șters cu succes!');
		} catch (error) {
			console.error('Eroare la ștergerea animalului.', error);
		}
	};

	const handleEditPetRedirect = () => {
		navigate(`/edit-pet?petId=${selectedPet.petId}`, {
			state: {
				petName: selectedPet.petName,
				age: selectedPet.age,
				breed: selectedPet.breed
			}
		});
	}


	if (!selectedPet) {
		return <p>Apasă pe numele unui animal pentru detalii.</p>;
	}

	return (
		<div className="info-pet">
			<div className="info">
				<h2>{selectedPet.petName}</h2>
				<div className="info-card">
					<p><FontAwesomeIcon className="icon" icon={faCalendarDays}/>Vârsta: {selectedPet.age}</p>
					<p><FontAwesomeIcon className="icon" icon={faHeart}/>Rasa: {selectedPet.breed}</p>
				</div>
				<div className="animal-buttons">
					<button onClick={handleEditPetRedirect}>Edit</button>
					<button onClick={handleDelete}>Delete</button>
				</div>
			</div>

		</div>
	)
}

export default PetDetails;
