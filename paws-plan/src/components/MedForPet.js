import React from 'react';
import "../styles/ViewPet.css"
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {deleteDoc, doc} from "firebase/firestore";
import {firestore} from "../firebaseConfig";

const MedForPet = ({selectedPet, medications}) => {
	sessionStorage.setItem('selectedPet', selectedPet);
	const userId = sessionStorage.getItem('userId');

	const navigate = useNavigate();

	const handleAddMedication = () => {
		navigate(`/add-medication?petId=${selectedPet.petId}`);
	}

	const handleDeleteMedication = (medId) => {
		const MySwal = withReactContent(Swal);

		MySwal.fire({
			title: 'Ești sigur că vrei să ștergi medicația?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#180026FF',
			cancelButtonColor: '#8B0000FF',
			confirmButtonText: 'Șterge',
			cancelButtonText: 'Anulare'
		}).then((result) => {
			if (result.isConfirmed) {
				deleteMedication(medId);
			}
		});
	};

	const deleteMedication = async (medId) => {
		try {
			const medicationRef = doc(firestore, 'users', userId, 'pets', selectedPet.petId, 'medication', medId);
			await deleteDoc(medicationRef);
			window.location.reload();
			console.log('Medicația a fost ștearsă cu succes!');
		} catch (error) {
			console.error('Eroare la ștergerea medicației.', error);
		}
	};


	if (!selectedPet) {
		return <p>Select a pet to view medications.</p>;
	}

	return (
		<div className="meds">
			<div className="header">
				<h2>Medicația lui {selectedPet.petName}</h2>
				<button className="addmed"
						onClick={handleAddMedication}>
					<FontAwesomeIcon className="icon" icon={faPlus}/>
				</button>
			</div>
			<div className="med-pets">
				{medications.map((medication) => (
					<div key={medication.medId} className="med-card">
						<p><strong>Nume:</strong> {medication.medName}</p>
						<p><strong>Dozaj:</strong> {medication.dosage}</p>
						<p><strong>Administrare:</strong> {medication.timestamp && medication.timestamp.toString()}</p>
						<button className="deletemed" onClick={() => handleDeleteMedication(medication.medId)}><FontAwesomeIcon className="icon" icon={faTrash}/></button>
					</div>
				))}
			</div>
		</div>
	)
}

export default MedForPet;
