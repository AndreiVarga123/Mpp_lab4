import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from "react-router-dom";

export default function HomeProducer() {
    const [producers, setProducers] = useState([]);
    const [pageNr,setPageNr] = useState(1);

    useEffect(() => {
        loadProducers();
    });


    const loadProducers = async () => {
        const result = await axios.post("api/producers/dto",pageNr, {
            headers: {
                'Content-Type': 'application/json'
            }});
        console.log(result.data);
        setProducers(result.data);
    };

    const deleteProducer = async (id) => {
        await axios.delete(`api/producers/${id}`);
        loadProducers();
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
                        <th scope="col">Country</th>
                        <th scope="col">Founding Year</th>
                        <th scope="col">Description</th>
                        <th scope="col">Number of Breweries</th>
                        <th scope="col">Number of Beers</th>
                        <th scope='col'>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {producers.map((producer) => (
                        <tr>
                            <td>{producer.id}</td>
                            <td>{producer.name}</td>
                            <td>{producer.country}</td>
                            <td>{producer.founding_year}</td>
                            <td>{producer.descr}</td>
                            <td>{producer.nrOfBreweries}</td>
                            <td>{producer.nrOfBeers}</td>
                            <td>
                                <Link className="btn btn-primary mx-2" to={`/viewProducer/${producer.id}`}>View</Link>
                                <Link className="btn btn-outline-primary mx-2" to={`/editProducer/${producer.id}`}>Edit</Link>
                                <button className="btn btn-danger mx-2" onClick={()=>deleteProducer(producer.id)}>Delete</button>
                            </td>
                            {/*<td>*/}
                            {/*    <Link className="btn btn-primary mx-2" to={`/viewBeer/${producer.id}`}>View</Link>*/}
                            {/*    <Link className="btn btn-outline-primary mx-2" to={`/editBeer/${producer.id}`}>Edit</Link>*/}
                            {/*    <button className="btn btn-danger mx-2" onClick={()=>deleteBeer(producer.id)}>Delete</button>*/}
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