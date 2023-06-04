import React from 'react';
import Login from './components/Login';
import Register from "./components/Register";
import CreateOperation from "./components/CreateOperation";
import ReadOperation from "./components/ReadOperation";
import UpdateOperation from "./components/UpdateOperation";
import DeleteOperation from "./components/DeleteOperation";
import AddPet from "./components/AddPet";

const App = () => {
    const userId = 'sBoHD7prgza6vYK6ELtgwcGRnh02';

    return (
        <div>
            <h1>My Firebase App</h1>
            {/*<Register/>*/}
            {/*<Login />*/}
            {/*<CreateOperation/>*/}
            {/*<ReadOperation/>*/}
            {/*<UpdateOperation/>*/}
            {/*<DeleteOperation/>*/}
            <AddPet userId={userId}/>
        </div>
    );
};

export default App;
