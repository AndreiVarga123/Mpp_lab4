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
import AddBrewery from "./components/brewery/AddBrewery";
import EditBrewery from "./components/brewery/EditBrewery";
import ViewBrewery from "./components/brewery/ViewBrewery";
import HomeBeerBrewery from "./components/beerBreweries/HomeBeerBrewery";
import AddBeerBrewery from "./components/beerBreweries/AddBeerBrewery";
import EditBeerBrewery from "./components/beerBreweries/EditBeerBrewery";
import ViewBeerBrewery from "./components/beerBreweries/ViewBeerBrewery";
import Login from "./components/login/Login";
import Register from "./components/login/Register";

function App() {
  return (
      <div className="App">
          <Router>
              <Navbar/>
              <Routes>
                  {/*<Route exact path="/login" element={<Login/>}/>*/}
                  {/*<Route exact path="*" element={<Navbar/>}/>*/}
                  {/*<Route exact path="/register" element={<Register/>}/>*/}
                  <Route exact path="/beer" element={<HomeBeer/>} />
                  <Route exact path="/addBeer" element={<AddBeer/>} />
                  <Route exact path="/editBeer/:id" element={<EditBeer/>}/>
                  <Route exact path="/viewBeer/:id" element={<ViewBeer/>}/>

                  <Route exact path="/producer" element={<HomeProducer/>} />
                  <Route exact path="/addProducer" element={<AddProducer/>} />
                  <Route exact path="/editProducer/:id" element={<EditProducer/>}/>
                  <Route exact path="/viewProducer/:id" element={<ViewProducer/>}/>

                  <Route exact path="/brewery" element={<HomeBrewery/>} />
                  <Route exact path="/addBrewery" element={<AddBrewery/>} />
                  <Route exact path="/editBrewery/:id" element={<EditBrewery/>}/>
                  <Route exact path="/viewBrewery/:id" element={<ViewBrewery/>}/>

                  <Route exact path="/beerBrewery" element={<HomeBeerBrewery/>} />
                  <Route exact path="/addBeerBrewery" element={<AddBeerBrewery/>} />
                  <Route exact path="/editBeerBrewery/:id" element={<EditBeerBrewery/>}/>
                  <Route exact path="/viewBeerBrewery/:id" element={<ViewBeerBrewery/>}/>
              </Routes>
          </Router>
      </div>
  );
}

export default App;
