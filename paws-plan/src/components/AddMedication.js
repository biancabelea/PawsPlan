import React, {useState, useContext, useEffect} from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';
import { UserContext } from './UserContext';
import { useNavigate, useLocation } from "react-router-dom";

const AddMedication = () => {
	const { userId } = useContext(UserContext);
	const navigate = useNavigate();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);

	const petId = searchParams.get('petId');
	const petName = searchParams.get('petName');

	const [medName, setMedName] = useState('');
	const [dosage, setDosage] = useState('');
	const [timestamp, setTimestamp] = useState('');

	const handleAddMedication = async () => {
		try {
			const medication = {
				medName: medName,
				dosage: dosage,
				timestamp: timestamp
			};

			const petRef = collection(firestore, 'users', userId, 'pets', petId, 'medication');
			await addDoc(petRef, medication);

			setMedName('');
			setDosage('');
			setTimestamp('');
			console.log("Medicatia a fost adaugata cu succes!");
			navigate('/');
		} catch (error) {
			console.error('Eroare la adaugarea medicației!', error);
		}
	};

	return (
		<div>
			<h2>Add Medication</h2>
			{/*<h3>{selectedPet?.petName}</h3>*/}
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
