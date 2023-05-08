import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewBeerBrewery() {

    const [beerBrewery,setBeerBrewery] = useState({
        id:0,
        beer:null,
        brewery:null,
        quantity:0,
        boolean:false
    });

    const {id}=useParams();

    useEffect(()=>{
        loadBeerBrewery();

    },[])

    const loadBeerBrewery=async()=>{
        const result = await axios.get(`https://soparla-mpp.crabdance.com/beer_breweries/${id}`);
        console.log(result);
        setBeerBrewery(result.data);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 shadow offset-md-3 border rounded mx-auto p-4 mt-2">
                    <h2 className="text-center m-4">BeerBrewery Details</h2>

                    <div className="card">
                        <div className="card-header">
                            Details of  BeerBrewery {beerBrewery.id}:
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Beer #{beerBrewery.beer?.id}:</b>
                                    <p>Name: {beerBrewery.beer?.name}</p>
                                </li>
                                <li className="list-group-item">
                                    <b>Brewery #{beerBrewery.brewery?.id}:</b>
                                    <p>Name: {beerBrewery.brewery?.name}</p>
                                </li>
                                <li className="list-group-item">
                                    <b>Quantity:</b>
                                    {beerBrewery.quantity}
                                </li>
                                <li className="list-group-item">
                                    <b>Tested:</b>
                                    {beerBrewery.tested?.toString()}
                                </li>
                            </ul>

                        </div>
                    </div>
                    <Link className="btn btn-primary my-2" to="/beerBrewery">Back to Home</Link>
                </div>
            </div>

        </div>

    )
}