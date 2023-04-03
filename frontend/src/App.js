import logo from './logo.svg';
import './App.css';
import './App.css'
import React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import AddBeer from "./components/beer/AddBeer";
import EditBeer from "./components/beer/EditBeer";
import ViewBeer from "./components/beer/ViewBeer";
import SortBeer from "./components/beer/SortBeer";

function App() {
  return (
      <div className="App">
          <Router>
              <Navbar/>
              <Routes>
                  <Route exact path="/" element={<Home/>} />
                  <Route exact path="/addBeer" element={<AddBeer/>} />
                  <Route exact path="/editBeer/:id" element={<EditBeer/>}/>
                  <Route exact path="/viewBeer/:id" element={<ViewBeer/>}/>
                  <Route exact path="/sorBeer" element={<SortBeer/>}/>
              </Routes>
          </Router>
      </div>
  );
}

export default App;
