import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewBrewery() {

    const [brewery,setBrewery] = useState({
        id:0,
        name:"",
        location:"",
        year:0,
        descr:"",
        website:0,
        beerBreweries:[]
    });

    const {id}=useParams();

    useEffect(()=>{
        loadBrewery();

    },[])

    const loadBrewery=async()=>{
        const result = await axios.get(`https://soparla-mpp.crabdance.com/breweries/${id}`);
        console.log(result);
        setBrewery(result.data);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 shadow offset-md-3 border rounded mx-auto p-4 mt-2">
                    <h2 className="text-center m-4">Brewery Details</h2>

                    <div className="card">
                        <div className="card-header">
                            Details of  brewery {brewery.id}:
                            <ul className="list-group list-group-flush">

                                <li className="list-group-item">
                                    <b>Name:</b>
                                    {brewery.name}
                                </li>
                                <li className="list-group-item">
                                    <b>Location:</b>
                                    {brewery.location}
                                </li>
                                <li className="list-group-item">
                                    <b>Founding year:</b>
                                    {brewery.year}
                                </li>
                                <li className="list-group-item">
                                    <b>Description:</b>
                                    {brewery.descr}
                                </li>
                                <li className="list-group-item">
                                    <b>Website:</b>
                                    {String(brewery.website)}
                                </li>
                                <li className="list-group-item">
                                    <b>Beers:</b>
                                    {brewery.beerBreweries?.map(beerBrewery => (
                                        <div>
                                            <br/>Brewery {beerBrewery?.beer.id}<br/>
                                            Quantity: {beerBrewery?.quantity}<br/>
                                            Tested: {beerBrewery?.tested.toString()}
                                        </div>
                                    ))}
                                </li>
                            </ul>

                        </div>
                    </div>
                    <Link className="btn btn-primary my-2" to="/brewery">Back to Home</Link>
                </div>
            </div>

        </div>

    )
}