import React, { useEffect, useState } from 'react'
import axios from 'axios'
import config from "bootstrap/js/src/util/config";
import data from "bootstrap/js/src/dom/data";
import {Link} from "react-router-dom";
import Button from "bootstrap/js/src/button";

export default function Home() {
    const [beers, setBeers] = useState([]);
    const [filterNr,setFilterNr] = useState(0);

    useEffect(() => {
        onSubmit();
    });

    const loadBeers = async () => {
        const result = await axios.get("api/beers/details");
        setBeers(result.data);

    }

    const onInputChange=(e)=>{
        setFilterNr(e.target.value);
    };

    const onSubmit = async () => {
        const result = await axios.post("api/beers/filter",filterNr, {
            headers: {
                'Content-Type': 'application/json'
            }});
        setBeers(result.data);
    };

    const deleteBeer = async (id) => {
        await axios.delete(`api/beers/${id}`);
        loadBeers();
    }

    const sort = async() =>{
        setBeers(beers.sort((a,b)=>{return a.price>b.price}));
    }

    return (
        <div className='container'>
            <form>
                <br/>
                <div className="mb-3">
                    <input
                        type = {"number"}
                        className={"form-control"}
                        placeholder={"Enter number to filter by"}
                        name={"filterNr"}
                        value={filterNr}
                        defaultValue={0}
                        onChange={(e)=>onInputChange(e)}
                    />
                </div>
            </form>

            <button className="btn btn-primary mx-2">Sort by price</button>

            <div className='py-4'>
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Producer</th>
                        <th scope="col">Color</th>
                        <th scope="col">Alcohol Level</th>
                        <th scope="col">Price</th>
                        <th scope="col">Packaging</th>
                        <th scope='col'>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {beers.map((beer, index) => (
                        <tr>
                            <th scope ="row" key = {index}>{index=index+1}</th>
                            <td>{beer.name}</td>
                            <td>{beer.producer?.name}</td>
                            <td>{beer.color}</td>
                            <td>{beer.alcoholLvl}</td>
                            <td>{beer.price}</td>
                            <td>{beer.packaging}</td>
                            <td>
                                <Link className="btn btn-primary mx-2" to={`/viewBeer/${beer.id}`}>View</Link>
                                <Link className="btn btn-outline-primary mx-2" to={`/editBeer/${beer.id}`}>Edit</Link>
                                <button className="btn btn-danger mx-2" onClick={()=>deleteBeer(beer.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}