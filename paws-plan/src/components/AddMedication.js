import React, {useState} from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';
import { useNavigate, useLocation } from "react-router-dom";
import Swal from 'sweetalert2';

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
		<div>
			<h2>Add Medication</h2>
			{/*<h3>{selectedPet}</h3>*/}
			<div>
				<label htmlFor="medName">Medication Name:</label>
				<input
					type="text"
					id="medName"
					value={medName}
					onChange={(e) => setMedName(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="doza">Dosage:</label>
				<input
					type="text"
					id="doza"
					value={dosage}
					onChange={(e) => setDosage(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="timestamp">Timespan:</label>
				<input
					type="date"
					id="timestamp"
					value={timestamp}
					onChange={(e) => setTimestamp(e.target.value)}
				/>
			</div>
			<button onClick={handleAddMedication}>Adaugă medicație</button>
		</div>
	);
};

export default AddMedication;
