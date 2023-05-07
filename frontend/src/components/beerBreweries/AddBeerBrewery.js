import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {wait} from "@testing-library/user-event/dist/utils";

export default function AddBeerBrewery(){

    let navigate=useNavigate();

    const [beerAutocompleteInput,setBeerAutocompleteInput] = useState("");
    const [beerKeyInput,setBeerKeyInput] = useState("");
    const [beerInputFocused, setBeerInputFocused] = useState(false);

    const [breweryAutocompleteInput,setBreweryAutocompleteInput] = useState("");
    const [breweryKeyInput,setBreweryKeyInput] = useState("");
    const [breweryInputFocused, setBreweryInputFocused] = useState(false);

    const [beers, setBeers] = useState([]);
    const [breweries, setBreweries] = useState([]);

    const [beerBrewery,setBeerBrewery] = useState({
        beer:null,
        brewery:null,
        quantity:0,
        tested:false
    });

    const{quantity,tested}=beerBrewery;

    useEffect(() => {
        loadBeers();
        loadBreweries();
    });

    const onInputChange=(e)=>{
        setBeerBrewery({...beerBrewery,[e.target.name]:e.target.value});
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(beerBrewery);
        await axios.post("http://localhost:80/beer_breweries",beerBrewery);
        navigate("/beerBrewery");
    };

    const loadBeers = async() =>{
        if(beerAutocompleteInput!=="" && beerInputFocused===true) {
            const result = await axios.post("http://localhost:80/beers/autocomplete", beerAutocompleteInput, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setBeers(result.data);
            console.log(beers);
        }
    }

    const loadBreweries = async() =>{
        if(breweryAutocompleteInput!=="" && breweryInputFocused===true) {
            const result = await axios.post("http://localhost:80/breweries/autocomplete", breweryAutocompleteInput, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setBreweries(result.data);
        }
    }

    const onBeerAutoCompleteInputChange = async (e) => {
        setBeerAutocompleteInput(e.target.value);
    }


    const onBeerSelect = async(e) =>{
        setBeerKeyInput(e.key);
        // console.log(beerKeyInput);
        // console.log(beerAutocompleteInput);
    }

    const onBreweryAutoCompleteInputChange = async (e) => {
        setBreweryAutocompleteInput(e.target.value);
    }


    const onBrewerySelect = async(e) =>{
        setBreweryKeyInput(e.key);
        // console.log(breweryKeyInput);
        // console.log(breweryAutocompleteInput);
    }

    const setBeer = async () =>{
        setBeerInputFocused(false);
        if(beerKeyInput==="Unidentified") {
            const inputIdAndName = beerAutocompleteInput.split(":")
            const inputId = inputIdAndName.at(0).charAt(inputIdAndName.at(0).length - 1)
            const result = await axios.get(`http://localhost:80/beers/${inputId}`);
            setBeerBrewery({...beerBrewery,beer:result.data});
            // console.log(beerBrewery);
        }
    }

    const setBrewery = async () =>{
        setBreweryInputFocused(false);
        if(breweryKeyInput==="Unidentified") {
            const inputIdAndName = breweryAutocompleteInput.split(":")
            const inputId = inputIdAndName.at(0).charAt(inputIdAndName.at(0).length - 1)
            const result = await axios.get(`http://localhost:80/breweries/${inputId}`);
            setBeerBrewery({...beerBrewery,brewery:result.data});
            // console.log(beerBrewery);
        }
    }


    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Add BeerBrewery</h2>
                    <form onSubmit={(e)=>onSubmit(e)}>

                        <div className="mb-3 form-group">
                            <label>Beer</label>
                            <input
                                type = {"text"}
                                className={"form-control"}
                                placeholder={"Enter Beer"}
                                name={"beerAutocompleteInput"}
                                value={beerAutocompleteInput}
                                onChange={(e) => onBeerAutoCompleteInputChange(e)}
                                onKeyDown={(e)=>onBeerSelect(e)}
                                onBlur={()=>setBeer()}
                                onFocus={()=>setBeerInputFocused(true)}
                                list={"beers"}
                            />
                            <datalist id={"beers"}>
                                {beers.map(beer => (
                                    <option>Beer {beer?.id}: {beer?.name}</option>
                                ))}
                            </datalist>
                        </div>

                        <div className="mb-3 form-group">
                            <label>Brewery</label>
                            <input
                                type = {"text"}
                                className={"form-control"}
                                placeholder={"Enter Brewery"}
                                name={"breweryAutocompleteInput"}
                                value={breweryAutocompleteInput}
                                onChange={(e) => onBreweryAutoCompleteInputChange(e)}
                                onKeyDown={(e)=>onBrewerySelect(e)}
                                onBlur={()=>setBrewery()}
                                onFocus={()=>setBreweryInputFocused(true)}
                                list={"breweries"}
                            />
                            <datalist id={"breweries"}>
                                {breweries.map(brewery => (
                                    <option>Brewery {brewery?.id}: {brewery?.name}</option>
                                ))}
                            </datalist>
                        </div>

                        <div className="mb-3">
                            <label>Quantity</label>
                            <input
                                type = {"number"}
                                className={"form-control"}
                                placeholder={"Enter quantity"}
                                name={"quantity"}
                                value={quantity}
                                onChange={(e)=>onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Tested</label>
                            <div align={"left"}>
                                <br/><input
                                    type="radio"
                                    name="tested"
                                    onChange={(e)=>onInputChange(e)}
                                    value={true}
                                /> True
                                <br/><input
                                    type="radio"
                                    name="tested"
                                    onChange={(e)=>onInputChange(e)}
                                    value={false}
                                /> False
                            </div>
                        </div>
                        <button type="submit" className="btn btn-outline-primary">Submit</button>
                        <Link  className="btn btn-outline-danger mx-2" to="/beer">Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}