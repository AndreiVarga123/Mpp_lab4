import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function AddBrewery() {

    let navigate = useNavigate();

    const {id}= useParams();

    const [brewery,setBrewery] = useState({
        id:0,
        name:"",
        location:"",
        year:0,
        descr:"",
        website:0
    });

    const{name,location,year,descr,website}=brewery;

    const onInputChange = (e) => {
        setBrewery({ ...brewery, [e.target.name]: e.target.value });
    };

    const onSubmit =async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:80/breweries/${id}`, brewery);
        navigate("/");
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 shadow offset-md-3 border rounded mx-auto p-4 mt-2">
                    <h2 className="text-center m-4">Edit Producer</h2>

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
                            <label>Location</label>
                            <input
                                type = {"text"}
                                className={"form-control"}
                                placeholder={"Enter location"}
                                name={"location"}
                                value={location}
                                onChange={(e)=>onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Founding year</label>
                            <input
                                type = {"number"}
                                className={"form-control"}
                                placeholder={"Enter founding year"}
                                name={"year"}
                                value={year}
                                onChange={(e)=>onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Description</label>
                            <input
                                type = {"text"}
                                className={"form-control"}
                                placeholder={"Enter description"}
                                name={"descr"}
                                value={descr}
                                onChange={(e)=>onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Website</label>
                            <input
                                type = {"number"}
                                className={"form-control"}
                                placeholder={"Enter website"}
                                name={"website"}
                                value={website}
                                onChange={(e)=>onInputChange(e)}
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-primary">Submit</button>
                        <Link  className="btn btn-outline-danger mx-2" to="/brewery">Cancel</Link>
                    </form>

                </div>
            </div>
        </div>
    )
}