import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from "./components/Login";
import {UserProvider} from "./UserContext";

ReactDOM.render(
    <UserProvider>
        <Login />
    </UserProvider>,
  document.getElementById('root')
);