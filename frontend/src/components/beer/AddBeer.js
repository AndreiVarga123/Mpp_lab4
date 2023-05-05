import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";

export default function AddBeer(){

    let navigate=useNavigate();

    const [beer,setBeer] = useState({
            name:"",
            color:"",
            alcoholLvl:0,
            price:0,
            packaging:""
        });

    const{name,color,alcoholLvl,price,packaging}=beer;

    const onInputChange=(e)=>{
        setBeer({...beer,[e.target.name]:e.target.value});
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:80/beers",beer);
        navigate("/beer");
    };

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Add Beer</h2>

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
                            <label>Color</label>
                            <input
                                type = {"text"}
                                className={"form-control"}
                                placeholder={"Enter color"}
                                name={"color"}
                                value={color}
                                onChange={(e)=>onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label>AlcoholLvl</label>
                            <input
                                type = {"number"}
                                className={"form-control"}
                                placeholder={"Enter alcohol lvl"}
                                name={"alcoholLvl"}
                                value={alcoholLvl}
                                onChange={(e)=>onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Price</label>
                            <input
                                type = {"number"}
                                className={"form-control"}
                                placeholder={"Enter price"}
                                name={"price"}
                                value={price}
                                onChange={(e)=>onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Packaging</label>
                            <input
                                type = {"text"}
                                className={"form-control"}
                                placeholder={"Enter packaging"}
                                name={"packaging"}
                                value={packaging}
                                onChange={(e)=>onInputChange(e)}
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-primary">Submit</button>
                        <Link  className="btn btn-outline-danger mx-2" to="/beer">Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}