import React, { useEffect, useState } from 'react';
import { auth } from "./firebaseConfig";
import AddPet from "./components/AddPet";
import ViewPets from "./components/ViewPets";
import Register from "./components/Register";
import Login from "./components/Login";

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
            <h1>My Firebase App</h1>
            {userId ? (
                <>
                    <AddPet userId={userId}/>
                    <ViewPets userId={userId}/>
                </>
            ) : (
                <>
                    <Register/>
                    <Login/>
                </>
            )}
        </div>
    );
};

export default App;
