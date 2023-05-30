import React from 'react';
import Login from './components/Login';
import Register from "./components/Register";

const App = () => {
    return (
        <div>
            <h1>My Firebase App</h1>
            <Register/>
            <Login />
        </div>
    );
};

export default App;
