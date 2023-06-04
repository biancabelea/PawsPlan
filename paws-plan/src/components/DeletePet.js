import React, {useState} from 'react';
import { firestore } from "../firebaseConfig";
import { doc, deleteDoc} from 'firebase/firestore';

const DeletePet = ({userId, petId, onDelete}) => {
	const [confirmDelete, setConfirmDelete] = useState(false);

	const handleDelete = async () => {
		try {
			const petDocRef = doc(firestore, "users", userId, "pets", petId);
			await deleteDoc(petDocRef);
			onDelete(petId);
			console.log("Animalul a fost șters cu succes!");
		} catch (error) {
			console.error("Eroare la ștergerea animalulul.", error);
		}
	};

	const deleteConfirmation = () => {
		setConfirmDelete((confirm) => !confirm);
	};

	return (
		<div>
			{confirmDelete ? (
				<>
					<p>Ești sigur că vrei să ștergi acest animal?</p>
					<button onClick={handleDelete}>Șterge animalul</button>
					<button onClick={deleteConfirmation}>Anulare</button>
				</>
			) : (
				<button onClick={deleteConfirmation}>Șterge animalul</button>
			)}
		</div>
	);
};

export default DeletePet;
