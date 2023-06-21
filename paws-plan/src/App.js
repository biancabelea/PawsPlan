import React, { useEffect, useState } from 'react';
import { auth } from "./firebaseConfig";
import AddPet from "./components/AddPet";
import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";
import Homepage from "./components/Homepage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from "./components/UserContext";

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
        <UserProvider>
            <div>
                <Router>
                    <Routes>
                        <Route path="/" element={<Homepage/>} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/register" element={<Register/>} />
                        <Route path="/add-pet" element={<AddPet userId={userId}/>} />
                    </Routes>
                </Router>
            </div>
        </UserProvider>
    );
};

export default App;
