import React, { useState, useEffect } from 'react';
import { firestore } from '../firebaseConfig';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

const UpdateOperation = () => {
	const [todos, setTodos] = useState([]);
	const [selectedTodoId, setSelectedTodoId] = useState('');
	const [subject, setSubject] = useState('');

	useEffect(() => {
		const fetchTodos = async () => {
			const querySnapshot = await getDocs(collection(firestore, 'todos'));
			const data = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setTodos(data);
		};

		fetchTodos();
	}, []);

	const handleUpdate = async (e) => {
		e.preventDefault();
		if (subject !== '') {
			const todoRef = doc(firestore, 'todos', selectedTodoId);
			await updateDoc(todoRef, { subject: subject });
			setSubject('');
		}
	};

	return (
		<div>
			<h1>Update Entry</h1>
			<div>
				<select value={selectedTodoId} onChange={(e) => setSelectedTodoId(e.target.value)}>
					<option value="">Select a Todo</option>
					{todos.map((todo) => (
						<option key={todo.id} value={todo.id}>
							{todo.subject}
						</option>
					))}
				</select>
			</div>
			{selectedTodoId && (
				<form onSubmit={handleUpdate}>
					<div className="input-container">
						<input
							type="text"
							placeholder="Enter new subject"
							value={subject}
							onChange={(e) => setSubject(e.target.value)}
						/>
					</div>
					<div className="btn-container">
						<button>Update Todo</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default UpdateOperation;
