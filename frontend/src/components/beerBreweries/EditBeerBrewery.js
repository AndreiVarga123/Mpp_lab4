import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditBeerBrewery() {

    let navigate = useNavigate();

    const {id}= useParams();

    const [beerBrewery,setBeerBrewery] = useState({
        id:0,
        quantity:0,
        tested:false
    });

    const{quantity,tested}=beerBrewery;

    const onInputChange = (e) => {
        setBeerBrewery({ ...beerBrewery, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadBrewery();
    }, []);

    const onSubmit =async (e) => {
        e.preventDefault();
        await axios.post(`https://soparla-mpp.crabdance.com/beer_breweries/${id}`, beerBrewery);
        navigate("/beerBreweries");
    };

    const loadBrewery = async () => {
        const result = await axios.get(`https://soparla-mpp.crabdance.com/beer_breweries/${id}`);
        setBeerBrewery(result.data);
        console.log(beerBrewery);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 shadow offset-md-3 border rounded mx-auto p-4 mt-2">
                    <h2 className="text-center m-4">Edit BeerBrewery</h2>

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className="mb-3">
                            <label>Quantity</label>
                            <input
                                type = {"text"}
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
                                checked={tested}
                            /> True
                                <br/><input
                                type="radio"
                                name="tested"
                                onChange={(e)=>onInputChange(e)}
                                value={false}
                                checked={!tested}
                            /> False
                            </div>
                        </div>
                        <button type="submit" className="btn btn-outline-primary">Submit</button>
                        <Link  className="btn btn-outline-danger mx-2" to="/beerBrewery">Cancel</Link>
                    </form>

                </div>
            </div>
        </div>
    )
}