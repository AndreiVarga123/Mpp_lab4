import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewBeer() {

    const [beer,setBeer] = useState({
        id:0,
        name:"",
        color:"",
        producer:null,
        alcoholLvl:0,
        price:0,
        packaging:"",
        beerBreweries:[]
    });

    const {id}=useParams();

    useEffect(()=>{
        loadEmployee();

    },)

    const loadEmployee=async()=>{
        const result = await axios.get(`http://localhost:80/beers/${id}`);
        setBeer(result.data);}

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 shadow offset-md-3 border rounded mx-auto p-4 mt-2">
                    <h2 className="text-center m-4">Beer Details</h2>

                    <div className="card">
                        <div className="card-header">
                            Details of  beer {beer.id}:
                            <ul className="list-group list-group-flush">

                                <li className="list-group-item">
                                    <b>Name:</b>
                                    {beer.name}
                                </li>
                                <li className="list-group-item">
                                    <b>Producer {beer.producer?.id}:</b>
                                    <p>
                                        Name: {beer.producer?.name}<br/>
                                        Country: {beer.producer?.country}<br/>
                                        Founding Year: {beer.producer?.founding_year}<br/>
                                        Description: {beer.producer?.descr}<br/>
                                        Number of breweries: {beer.producer?.nrOfBreweries}<br/>
                                    </p>
                                </li>
                                <li className="list-group-item">
                                    <b>Color:</b>
                                    {beer.color}
                                </li>
                                <li className="list-group-item">
                                    <b>Alcohol Level:</b>
                                    {beer.alcoholLvl}
                                </li>
                                <li className="list-group-item">
                                    <b>Price:</b>
                                    {String(beer.price)}
                                </li>
                                <li className="list-group-item">
                                    <b>Breweries:</b>
                                    {beer.beerBreweries.map(beerBrewery => (
                                        <div>
                                            <br/>Brewery {beerBrewery?.brewery.id}<br/>
                                            Quantity: {beerBrewery?.quantity}<br/>
                                            Tested: {beerBrewery?.tested.toString()}
                                        </div>
                                    ))}
                                </li>
                            </ul>

                        </div>
                    </div>
                    <Link className="btn btn-primary my-2" to="/">Back to Home</Link>
                </div>
            </div>

        </div>

    )
}