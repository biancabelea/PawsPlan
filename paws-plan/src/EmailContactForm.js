import React, { useState, useEffect } from 'react';
import { firestore } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import './styles/EmailButton.css';
import emailjs from 'emailjs-com';

const EmailContactForm = () => {
	const userId = sessionStorage.getItem('userId');

	const [users, setUsers] = useState([]);

	useEffect(() => {
		getUsers();
	}, []);

	const getUsers = async () => {
		try {
			const usersQuery = collection(firestore, 'users');
			const usersSnapshot = await getDocs(usersQuery);
			const usersData = usersSnapshot.docs.map((doc) => {
				const data = doc.data();
				return {
					ownerName: data.ownerName,
					email: data.email,
				};
			});
			setUsers(usersData);
		} catch (error) {
			console.error('Eroare la afisarea utilizatorilor', error);
		}
	};

	const sendEmail = () => {
		users.forEach((user) => {
			const templateParams = {
				to_name: user.ownerName,
				to_email: user.email,
			};

			emailjs
				.send(
					'service_jtb5i97',
					'template_r58detq',
					templateParams,
					'n57BsnxNIWol_iHXz'
				)
				.then((result) => {
					console.log('Email sent successfully to', user.user_email);
				})
				.catch((error) => {
					console.error('Failed to send email to', user.user_email, error);
				});
		});
	};

	if (userId === 'IwCltxILHkQZlO2HdR1od6Aej6t2') {
		return (
			<div>
				<button onClick={sendEmail} className="send-button">Trimite emailuri</button>
			</div>
		);
	}
};

export default EmailContactForm;
