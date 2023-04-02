import React, { useEffect, useState } from 'react'
import axios from 'axios'
import config from "bootstrap/js/src/util/config";
import data from "bootstrap/js/src/dom/data";

export default function Home() {
    const [beers, setBeers] = useState([]);
    const [filterNr,setFilterNr] = useState(0);

    useEffect(() => {
        onSubmit();
    });

    const loadBeers = async () => {
        const result = await axios.get("http://localhost:80/beers/details");
        setBeers(result.data);

    }

    const onInputChange=(e)=>{
        setFilterNr(e.target.value);
    };

    const onSubmit = async () => {
        const result = await axios.post("http://localhost:80/beers/filter",filterNr, {
            headers: {
                'Content-Type': 'application/json'
            }});
        setBeers(result.data);
    };

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
                        onChange={(e)=>onInputChange(e)}
                    />
                </div>
            </form>

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
                                <button className="btn btn-primary mx-2">View</button>
                                <button className="btn btn-outline-primary mx-2">Edit</button>
                                <button className="btn btn-danger mx-2">Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}