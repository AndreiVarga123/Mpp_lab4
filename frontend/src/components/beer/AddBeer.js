import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";

export default function AddBeer(){

    let navigate=useNavigate();

    const [autocompleteInput,setAutocompleteInput] = useState("");
    const [autocompleteId,setAutocompleteId] = useState(0);

    const [producers, setProducers] = useState([]);
    const [producer,setProducer] = useState({
        id:0,
        name:"",
        country:"",
        founding_year:0,
        descr:"",
        nrOfBreweries:0,
        beers:[]
    });

    const [beer,setBeer] = useState({
            name:"",
            color:"",
            prod:null,
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

    const onAutoCompleteInputChange = async(e) => {
        setAutocompleteInput(e.target.value);
        const result = await axios.post("http://localhost:80/producers/autocomplete",autocompleteInput, {
            headers: {
                'Content-Type': 'application/json'
            }});
        setProducers(result.data);
    }

    const producerSelect = async(e) => {
        setAutocompleteId(e.target.value);
        const result = await axios.get(`http://localhost:80/producers/${autocompleteId}`);
        setProducer({...beer,[e.target.name]:e.target.value});
        beer.prod = producer;
    }

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
                            <label>Producer</label>
                            <input
                                type = {"text"}
                                className={"dropdown"}
                                placeholder={"Enter Producer"}
                                name={"autocompleteInput"}
                                value={autocompleteInput}
                                onChange={(e)=>onAutoCompleteInputChange()}
                            />
                            <select onSelect={(e)=>producerSelect(e)}>
                                {producers?.map(pr => (
                                    <option>pr.name [pr.id]</option>
                                ))}
                            </select>
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