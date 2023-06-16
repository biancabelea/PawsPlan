import React, { useEffect, useState } from 'react';
import { auth } from "./firebaseConfig";
import AddPet from "./components/AddPet";
import ViewPets from "./components/ViewPets";
import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";
import Logout from "./components/authentication/Logout";
import Homepage from "./components/Homepage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {UserProvider} from "./components/UserContext";


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
                    </Routes>
                </Router>
                {/*<h1>My Firebase App</h1>*/}
                {/*{userId ? (*/}
                {/*    <>*/}
                {/*        <AddPet userId={userId}/>*/}
                {/*        <ViewPets userId={userId}/>*/}
                {/*    </>*/}
                {/*) : (*/}
                {/*    <>*/}
                {/*        <Register/>*/}
                {/*        <Login/>*/}
                {/*    </>*/}
                {/*)}*/}
            </div>
        </UserProvider>
    );
};

export default App;
