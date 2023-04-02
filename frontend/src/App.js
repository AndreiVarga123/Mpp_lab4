import logo from './logo.svg';
import './App.css';
import './App.css'
import React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import AddBeer from "./components/beer/AddBeer";

function App() {
  return (
      <div className="App">
          <Router>
              <Navbar/>
              <Routes>
                  <Route exact path="/" element={<Home/>} />
                  <Route exact path="/addBeer" element={<AddBeer/>} />
              </Routes>
          </Router>
      </div>
  );
}

export default App;
