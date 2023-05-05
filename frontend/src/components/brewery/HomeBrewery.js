import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from "react-router-dom";

export default function HomeBrewery() {
    const [breweries, setBreweries] = useState([]);
    const [pageNr,setPageNr] = useState(1);

    useEffect(() => {
        loadBreweries();
    });


    const loadBreweries = async () => {
        const result = await axios.post("http://localhost:80/breweries/dto",pageNr, {
            headers: {
                'Content-Type': 'application/json'
            }});
        setBreweries(result.data);
    };

    const deleteBrewery = async (id) => {
        await axios.delete(`http://localhost:80/breweries/${id}`);
        loadBreweries();
    }

    const nextPage = () =>{
        if(pageNr!==999901) {
            setPageNr(pageNr + 100);
        }
    }

    const prevPage = () =>{
        if(pageNr!==1) {
            setPageNr(pageNr - 100);
        }
    }

    return (
        <div className='container'>
            <div>
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Location</th>
                        <th scope="col">Founding Year</th>
                        <th scope="col">Description</th>
                        <th scope="col">Website</th>
                        <th scope="col">Number of Beers</th>
                        <th scope='col'>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {breweries.map((brewery) => (
                        <tr>
                            <td>{brewery.id}</td>
                            <td>{brewery.name}</td>
                            <td>{brewery.location}</td>
                            <td>{brewery.year}</td>
                            <td>{brewery.descr}</td>
                            <td>{brewery.website}</td>
                            <td>{brewery.nrOfBeers}</td>
                            <td>
                                <Link className="btn btn-primary mx-2" to={`/viewBrewery/${brewery.id}`}>View</Link>
                                <Link className="btn btn-outline-primary mx-2" to={`/editBrewery/${brewery.id}`}>Edit</Link>
                                <button className="btn btn-danger mx-2" onClick={()=>deleteBrewery(brewery.id)}>Delete</button>
                            </td>
                            {/*<td>*/}
                            {/*    <Link className="btn btn-primary mx-2" to={`/viewBeer/${brewery.id}`}>View</Link>*/}
                            {/*    <Link className="btn btn-outline-primary mx-2" to={`/editBeer/${brewery.id}`}>Edit</Link>*/}
                            {/*    <button className="btn btn-danger mx-2" onClick={()=>deleteBeer(brewery.id)}>Delete</button>*/}
                            {/*</td>*/}
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div>
                    <button className="btn btn-outline-primary mx-2" onClick={()=>prevPage()}>Prev Page</button>
                    <button className="btn btn-outline-primary mx-2" onClick={()=>nextPage()}>Next Page</button>
                </div>
            </div>
        </div>
    );
}