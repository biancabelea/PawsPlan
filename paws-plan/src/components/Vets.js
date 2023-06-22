import React, { useState, useEffect } from 'react';
import Menu from "./Menu";
import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import "../styles/Vets.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLocationDot, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Vets = () => {
	const [vets, setVets] = useState([]);

	useEffect(() => {
		const fetchVets = async () => {
			try {
				const vetsQuery = query(collection(firestore, "vets"));
				const vetsSnapshot = await getDocs(vetsQuery);
				const vetsData = vetsSnapshot.docs.map((doc) => {
					const data = doc.data();
					return {
						vetId: doc.id,
						cabinet: data.cabinet,
						adresa: data.adresa,
						telefon: data.telefon,
						email: data.email
					};
				});
				setVets(vetsData);
			} catch (error) {
				console.error("Eroare la afișarea veterinarilor.", error);
			}
		}
		fetchVets();
	}, []);

	return (
		<div className="body-container">
			<Menu/>
			<div className="content-container">
				<div className="content">
					<div className="content-vets">
						{vets.map((vet) => (
							<div className="vet-card">
								<h2>{vet.cabinet}</h2>
								<p> <FontAwesomeIcon className="icon" icon={faLocationDot}/>{vet.adresa}</p>
								<p> <FontAwesomeIcon className="icon" icon={faPhone}/>{vet.telefon}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Vets;
