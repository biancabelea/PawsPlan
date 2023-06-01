import React, { useState, useEffect } from 'react';
import { firestore } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const ReadOperation = () => {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		const fetchTodos = async () => {
			const querySnapshot = await getDocs(collection(firestore, 'todos'));
			const data = querySnapshot.docs.map((doc) => doc.data());
			setTodos(data);
		};

		fetchTodos();
	}, []);

	return (
		<div>
			<h1>Todos</h1>
			{todos.map((todo) => (
				<div key={todo.id}>
					<p>Subject: {todo.subject}</p>
					<p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
				</div>
			))}
		</div>
	);
};

export default ReadOperation;
