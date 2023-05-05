import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewProducer() {

    const [producer,setProducer] = useState({
        id:0,
        name:"",
        country:"",
        founding_year:0,
        descr:"",
        nrOfBreweries:0,
        beers:[]
    });

    const {id}=useParams();

    useEffect(()=>{
        loadProducer();

    },[])

    const loadProducer=async()=>{
        const result = await axios.get(`http://localhost:80/producers/${id}`);
        console.log(result);
        setProducer(result.data);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 shadow offset-md-3 border rounded mx-auto p-4 mt-2">
                    <h2 className="text-center m-4">Producer Details</h2>

                    <div className="card">
                        <div className="card-header">
                            Details of  producer {producer.id}:
                            <ul className="list-group list-group-flush">

                                <li className="list-group-item">
                                    <b>Name:</b>
                                    {producer.name}
                                </li>
                                <li className="list-group-item">
                                    <b>Country:</b>
                                    {producer.country}
                                </li>
                                <li className="list-group-item">
                                    <b>Founding year:</b>
                                    {producer.founding_year}
                                </li>
                                <li className="list-group-item">
                                    <b>Description:</b>
                                    {producer.descr}
                                </li>
                                <li className="list-group-item">
                                    <b>NUmber of breweries:</b>
                                    {String(producer.nrOfBreweries)}
                                </li>
                                <li className="list-group-item">
                                    <b>Beer:</b>
                                    {producer.beers?.map(beer => (
                                        <div>
                                            <br/>Beer {beer?.beer.id}<br/>
                                            Name: {beer?.name}<br/>
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