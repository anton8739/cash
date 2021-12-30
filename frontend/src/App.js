import './App.css';
import 'normalize-scss';
import {BrowserRouter, Route} from "react-router-dom";
import React from 'react'

import Rutes from "./routes";

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Rutes />
            </ BrowserRouter>
        </div>
    );
}

export default App;
