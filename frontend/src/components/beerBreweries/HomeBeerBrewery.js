import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from "react-router-dom";

export default function HomeBeerBrewery() {
    const [beerBreweries, setBeerBreweries] = useState([]);
    const [pageNr,setPageNr] = useState(1);

    useEffect(() => {
        loadBeerBreweries();
    });


    const loadBeerBreweries = async () => {
        const result = await axios.post("https://soparla-mpp.crabdance.com/beer_breweries/dto",pageNr, {
            headers: {
                'Content-Type': 'application/json'
            }});
        setBeerBreweries(result.data);
    };

    const deleteBeerBrewery = async (id) => {
        await axios.delete(`https://soparla-mpp.crabdance.com/beer_breweries/${id}`);
        loadBeerBreweries();
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
                        <th scope="col">Beer#</th>
                        <th scope="col">Brewery#</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Tested</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {beerBreweries.map((beerBrewery) => (
                        <tr>
                            <td>{beerBrewery.id}</td>
                            <td>{beerBrewery.beer}</td>
                            <td>{beerBrewery.brewery}</td>
                            <td>{beerBrewery.quantity}</td>
                            <td>{beerBrewery.tested.toString()}</td>
                            <td>
                                <Link className="btn btn-primary mx-2" to={`/viewBeerBrewery/${beerBrewery.id}`}>View</Link>
                                <Link className="btn btn-outline-primary mx-2" to={`/editBeerBrewery/${beerBrewery.id}`}>Edit</Link>
                                <button className="btn btn-danger mx-2" onClick={()=>deleteBeerBrewery(beerBrewery.id)}>Delete</button>
                            </td>
                            {/*<td>*/}
                            {/*    <Link className="btn btn-primary mx-2" to={`/viewBeer/${beerBrewery.id}`}>View</Link>*/}
                            {/*    <Link className="btn btn-outline-primary mx-2" to={`/editBeer/${beerBrewery.id}`}>Edit</Link>*/}
                            {/*    <button className="btn btn-danger mx-2" onClick={()=>deleteBeer(beerBrewery.id)}>Delete</button>*/}
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