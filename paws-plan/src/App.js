import React from 'react';
import AddPet from "./components/AddPet";
import ViewPets from "./components/ViewPets";

const App = () => {
    const userId = 'sBoHD7prgza6vYK6ELtgwcGRnh02';

    return (
        <div>
            <h1>My Firebase App</h1>
            <AddPet userId={userId}/>
            <ViewPets userId={userId}/>
        </div>
    );
};

export default App;
