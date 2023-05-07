import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {wait} from "@testing-library/user-event/dist/utils";
import modal from "bootstrap/js/src/modal";

export default function AddBeer(){

    let navigate=useNavigate();

    const [autocompleteInput,setAutocompleteInput] = useState("");
    const [keyInput,setKeyInput] = useState("");
    const [inputFocused, setInputFocused] = useState(false);
    const [errorList,setErrorList] = useState([]);

    const [producers, setProducers] = useState([]);

    const [beer,setBeer] = useState({
            name:"",
            color:"",
            producer:null,
            alcoholLvl:0,
            price:0,
            packaging:"",
            beerBreweries:[]
        });

    const{name,color,alcoholLvl,price,packaging}=beer;

    useEffect(() => {
        loadProducers();
    });

    const onInputChange=(e)=>{
        setBeer({...beer,[e.target.name]:e.target.value});
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const result = await axios.post("http://localhost:80/beers",beer);
        console.log(result.data.toString())
        if(!result.data.toString().includes("Object")){
            setErrorList(result.data.replace('[','').replace(']','').split(","));
            document.getElementById("dialogToggle").click();
        }else{
            navigate("/beer");
        }
    };

    const loadProducers = async() =>{
        if(autocompleteInput!=="" && inputFocused===true) {
            const result = await axios.post("http://localhost:80/producers/autocomplete", autocompleteInput, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setProducers(result.data);
        }
    }


    const onAutoCompleteInputChange = async (e) => {
        setAutocompleteInput(e.target.value);
    }


    const onSelect = async(e) =>{
        setKeyInput(e.key);
        console.log(keyInput);
        console.log(autocompleteInput);
    }

    const setProducer = async () =>{
        setInputFocused(false);
        if(keyInput==="Unidentified") {
            const inputIdAndName = autocompleteInput.split(":")
            const inputId = inputIdAndName.at(0).charAt(inputIdAndName.at(0).length - 1)
            const result = await axios.get(`http://localhost:80/producers/${inputId}`);
            setBeer({...beer,producer:result.data});
            console.log(beer);
        }
    }


    const resultBig = (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">

                    <button id="dialogToggle" type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal " hidden={true}></button>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Please fix the following problems</h5>
                                </div>
                                <div className="modal-body">
                                    {errorList?.map(error => (
                                        <div>{error}</div>
                                    ))}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>


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

                        <div className="mb-3 form-group">
                            <label>Producer</label>
                            <input
                                type = {"text"}
                                className={"form-control"}
                                placeholder={"Enter Producer"}
                                name={"autocompleteInput"}
                                value={autocompleteInput}
                                onChange={(e) => onAutoCompleteInputChange(e)}
                                onKeyDown={(e)=>onSelect(e)}
                                onBlur={()=>setProducer()}
                                onFocus={()=>setInputFocused(true)}
                                list={"producers"}
                            />
                            <datalist id={"producers"}>
                                {producers.map(producer => (
                                    <option>Brewery {producer?.id}: {producer?.name}</option>
                                ))}
                            </datalist>
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
                        <button type="submit" className="btn btn-outline-primary" >Submit</button>
                        <Link  className="btn btn-outline-danger mx-2" to="/beer">Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )

    return resultBig;
}