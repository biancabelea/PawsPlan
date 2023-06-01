import React, { useState, useEffect } from 'react';
import { firestore } from '../firebaseConfig';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

const DeleteOperation = () => {
	const [todos, setTodos] = useState([]);
	const [selectedTodoId, setSelectedTodoId] = useState('');

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

	const handleDelete = async () => {
		const todoRef = doc(firestore, 'todos', selectedTodoId);
		await deleteDoc(todoRef);
		setSelectedTodoId('');
	};

	return (
		<div>
			<h1>Delete Entry</h1>
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
				<div className="btn-container">
					<button onClick={handleDelete}>Delete Todo</button>
				</div>
			)}
		</div>
	);
};

export default DeleteOperation;
