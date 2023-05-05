import logo from './logo.svg';
import './App.css';
import './App.css'
import React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./components/Navbar";
import HomeBeer from "./components/beer/HomeBeer";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import AddBeer from "./components/beer/AddBeer";
import EditBeer from "./components/beer/EditBeer";
import ViewBeer from "./components/beer/ViewBeer";
import HomeProducer from "./components/producer/HomeProducer";
import ViewProducer from "./components/producer/ViewProducer";
import EditProducer from "./components/producer/EditProducer";
import AddProducer from "./components/producer/AddProducer";
import HomeBrewery from "./components/brewery/HomeBrewery";

function App() {
  return (
      <div className="App">
          <Router>
              <Navbar/>
              <Routes>
                  <Route exact path="/beer" element={<HomeBeer/>} />
                  <Route exact path="/addBeer" element={<AddBeer/>} />
                  <Route exact path="/editBeer/:id" element={<EditBeer/>}/>
                  <Route exact path="/viewBeer/:id" element={<ViewBeer/>}/>

                  <Route exact path="/producer" element={<HomeProducer/>} />
                  <Route exact path="/addProducer" element={<AddProducer/>} />
                  <Route exact path="/editProducer/:id" element={<EditProducer/>}/>
                  <Route exact path="/viewProducer/:id" element={<ViewProducer/>}/>

                  <Route exact path="/brewery" element={<HomeBrewery/>} />
                  {/*<Route exact path="/addProducer" element={<AddProducer/>} />*/}
                  {/*<Route exact path="/editProducer/:id" element={<EditProducer/>}/>*/}
                  {/*<Route exact path="/viewProducer/:id" element={<ViewProducer/>}/>*/}
              </Routes>
          </Router>
      </div>
  );
}

export default App;
