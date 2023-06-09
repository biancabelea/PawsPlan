import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddPet from "./components/AddPet";
import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";
import Homepage from "./components/Homepage";
import AddMedication from "./components/AddMedication";
import MyPets from "./components/MyPets";
import EditPet from "./components/EditPet";
import Vets from "./components/Vets";
import { auth } from "./firebaseConfig";
import EmailContactForm from "./EmailContactForm";

const App = () => {
    const [userId, setUserId] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserId(user.uid);
                setLoggedIn(true);
            } else {
                setUserId(null);
                setLoggedIn(false);
            }
        });
        return () => unsubscribe();
        }, []);

    return (
            <div>
                <Router>
                    <Routes>
                        <Route path="/" element={<Homepage/>} />
                        <Route path="/my-pets" element={<MyPets/>} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/register" element={<Register/>} />
                        <Route path="/add-pet" element={<AddPet userId={userId}/>} />
                        <Route path="/add-medication" element={<AddMedication/>} />
                        <Route path="/edit-pet" element={<EditPet/>} />
                        <Route path="/vets" element={<Vets/>} />
                        <Route path="/email" element={<EmailContactForm/>} />
                    </Routes>
                </Router>
            </div>
    );
};

export default App;
