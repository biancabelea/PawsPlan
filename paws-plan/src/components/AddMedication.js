import React, {useState} from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';
import { useNavigate, useLocation } from "react-router-dom";
import Swal from 'sweetalert2';
import '../styles/AddMed.css';

const AddMedication = () => {
	const userId = sessionStorage.getItem('userId');
	const selectedPet = sessionStorage.getItem('selectedPet');

	const navigate = useNavigate();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);

	const petId = searchParams.get('petId');

	const [medName, setMedName] = useState('');
	const [dosage, setDosage] = useState('');
	const [timestamp, setTimestamp] = useState('');

	const handleAddMedication = () => {
		Swal.fire({
			title: 'Adaugă medicație',
			text: 'Ești sigur că vrei să adaugi medicația?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonColor: '#180026FF',
			cancelButtonColor: '#8B0000FF',
			confirmButtonText: 'Adaugă',
			cancelButtonText: 'Anulare'
		}).then((result) => {
			if (result.isConfirmed) {
				addMedication();
			}
		});
	};

	const addMedication = async () => {
		try {
			const medication = {
				medName: medName,
				dosage: dosage,
				timestamp: timestamp
			};

			console.log(medication);

			const petRef = collection(firestore, 'users', userId, 'pets', petId, 'medication');
			await addDoc(petRef, medication);

			setMedName('');
			setDosage('');
			setTimestamp('');
			console.log('Medication added successfully!');
			navigate('/');
		} catch (error) {
			console.error('Error adding medication:', error);
		}
	};

	return (
		<div className="content-addmed">
			<h1>Add Medication</h1>
			<div className="addmed-form">
				<div className="addmed-label">
					<p>Nume:</p>
					<input
						type="text"
						className="addmed-input"
						id="medName"
						value={medName}
						onChange={(e) => setMedName(e.target.value)}
					/>
				</div>
				<div className="addmed-label">
					<p>Dosage:</p>
					<input
						type="text"
						className="addmed-input"
						id="doza"
						value={dosage}
						onChange={(e) => setDosage(e.target.value)}
					/>
				</div>
				<div className="addmed-label">
					<p>Administrare:</p>
					<input
						type="date"
						className="addmed-input"
						id="timestamp"
						value={timestamp}
						onChange={(e) => setTimestamp(e.target.value)}
					/>
				</div>

				<button className="addmed-button" onClick={handleAddMedication}>ADAUGĂ</button>
			</div>
		</div>
	);
};

export default AddMedication;
