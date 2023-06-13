import React, { useState } from 'react';
import { firestore } from "../../firebaseConfig";
import { collection, addDoc } from 'firebase/firestore';

const CreateOperation = (props) => {
	const [subject, setSubject] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (subject !== "") {
			await addDoc(collection(firestore, "todos"), {
				subject,
				completed: false,
			});
			setSubject("");
		}
	}

	return (
		<div>
			<h1>Add entry</h1>
			<form onSubmit={handleSubmit}>
				<div className="input-container">
					<input type="text"
						   placeholder='what do you want to do?'
						   value={subject}
						   onChange={(e) => setSubject(e.target.value)}
					/>
				</div>
				<div className="btn-container">
					<button>Add-Todo</button>
				</div>
			</form>
		</div>
	);
}

export default CreateOperation;
