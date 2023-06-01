import React from 'react';
import Login from './components/Login';
import Register from "./components/Register";
import CreateOperation from "./components/CreateOperation";
import ReadOperation from "./components/ReadOperation";
import UpdateOperation from "./components/UpdateOperation";
import DeleteOperation from "./components/DeleteOperation";

const App = () => {
    return (
        <div>
            <h1>My Firebase App</h1>
            <Register/>
            <Login />
            <CreateOperation/>
            <ReadOperation/>
            <UpdateOperation/>
            <DeleteOperation/>
        </div>
    );
};

export default App;
