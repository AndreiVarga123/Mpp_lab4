import React from "react";
import {Link} from "react-router-dom"

export default function Navbar(){
    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/beer">Beer List</Link>
                    <Link className="btn btn-outline-light" to="/addBeer">Add Beer</Link>
                    {/*<button className="navbar-toggler" type="button" data-bs-toggle="collapse"*/}
                    {/*        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"*/}
                    {/*        aria-expanded="false" aria-label="Toggle navigation">*/}
                    {/*    <span className="navbar-toggler-icon"></span>*/}
                    {/*</button>*/}

                    <Link className="navbar-brand" to="/producer">Producer List</Link>
                    <Link className="btn btn-outline-light" to="/addProducer">Add Producer</Link>

                    <Link className="navbar-brand" to="/brewery">Brewery List</Link>
                    <Link className="btn btn-outline-light" to="/addBrewery">Add Brewery</Link>

                    <Link className="navbar-brand" to="/beerBrewery">BeerBrewery List</Link>
                    <Link className="btn btn-outline-light" to="/addBeerBrewery">Add BeerBrewery</Link>
                </div>
            </nav>
        </div>
    )
}