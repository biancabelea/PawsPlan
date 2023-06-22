import React, {useState, useEffect} from 'react';
import {collection, getDocs, query} from "firebase/firestore";
import {firestore} from "../firebaseConfig";
import Menu from "./Menu";
import "../styles/Vets.css";
import {faBone, faPhone} from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
								<h1>{vet.cabinet}</h1>
								<p> <FontAwesomeIcon className="icon" icon={faLocationDot}/>Adresa: {vet.adresa}</p>
								<p> <FontAwesomeIcon className="icon" icon={faPhone}/>Telefon: {vet.telefon}</p>
								<p> <FontAwesomeIcon className="icon" icon={faEnvelope}/>Email: {vet.email}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Vets;
