import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function AddProducer() {

    let navigate = useNavigate();

    const {id}= useParams();

    const [producer,setProducer] = useState({
        name:"",
        country:"",
        founding_year:0,
        descr:"",
        nrOfBreweries:0
    });

    const{name,country,founding_year,descr,nrOfBreweries}=producer;

    const onInputChange = (e) => {
        setProducer({ ...producer, [e.target.name]: e.target.value });
    };
    const onSubmit =async (e) => {
        e.preventDefault();
        await axios.post("api/producers",producer);
        navigate("/producers");
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 shadow offset-md-3 border rounded mx-auto p-4 mt-2">
                    <h2 className="text-center m-4">Edit Beer</h2>

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className="mb-3">
                            <label>Name</label>
                            <input
                                type = {"text"}
                                className={"form-control"}
                                placeholder={"Enter name"}
                                name={"name"}
                                value={name}
                                onChange={(e)=>onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Country</label>
                            <input
                                type = {"text"}
                                className={"form-control"}
                                placeholder={"Enter country"}
                                name={"country"}
                                value={country}
                                onChange={(e)=>onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Founding year</label>
                            <input
                                type = {"number"}
                                className={"form-control"}
                                placeholder={"Enter founding year"}
                                name={"founding_year"}
                                value={founding_year}
                                onChange={(e)=>onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Description</label>
                            <input
                                type = {"number"}
                                className={"form-control"}
                                placeholder={"Enter description"}
                                name={"descr"}
                                value={descr}
                                onChange={(e)=>onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Number of breweries</label>
                            <input
                                type = {"text"}
                                className={"form-control"}
                                placeholder={"Enter number of breweries"}
                                name={"nrOfBreweries"}
                                value={nrOfBreweries}
                                onChange={(e)=>onInputChange(e)}
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-primary">Submit</button>
                        <Link  className="btn btn-outline-danger mx-2" to="/">Cancel</Link>
                    </form>

                </div>
            </div>
        </div>
    )
}