import React, { useEffect, useState } from 'react'
import axios from 'axios'
import config from "bootstrap/js/src/util/config";
import data from "bootstrap/js/src/dom/data";
import {Link} from "react-router-dom";
import Button from "bootstrap/js/src/button";

export default function HomeBeer() {
    const [beers, setBeers] = useState([]);
    const [filterNr,setFilterNr] = useState(0);
    const [sortedByPrice,setSortedByPrice] = useState(false);
    const [sortedByProdYear,setSortedByProdYear] = useState(false);
    const [sortedByProdNrOfBreweries,setSortedByProdNrOfBreweries] = useState(false);
    const [pageNr,setPageNr] = useState(1);
    const [maxPage,setMaxPage] = useState(0);

    useEffect(() => {
        loadMaxPage();
        loadBeers();
    });

    // const loadBeers = async () => {
    //     const result = await axios.get("api/beers/details");
    //     setBeers(result.data);
    //
    // }

    const onInputChange=(e)=>{
        if(e.target.value==="")
            setFilterNr(0);
        else
            setFilterNr(e.target.value);
    };

    const loadMaxPage = async () =>{
        const result = await axios.get("https://soparla-mpp.crabdance.com/beers/maxPage");
        console.log(result.data);
        setMaxPage(result.data);
    }

    const loadBeers = async () => {
        if(sortedByProdYear){
            const result = await axios.post("https://soparla-mpp.crabdance.com/beers/stats",pageNr, {
                headers: {
                    'Content-Type': 'application/json'
                }});
            setBeers(result.data);
        }
        else if(sortedByProdNrOfBreweries){
            const result = await axios.post("https://soparla-mpp.crabdance.com/beers/stats2",pageNr, {
                headers: {
                    'Content-Type': 'application/json'
                }});

            setBeers(result.data);
        }
        else{
            const result = await axios.post("https://soparla-mpp.crabdance.com/beers/filter",[pageNr,filterNr], {
                headers: {
                    'Content-Type': 'application/json'
                }});
            if(sortedByPrice) {
                setBeers(result.data.sort((a, b) => {
                    return a.price > b.price ? 1 : -1
                }));
            }
            else
                setBeers(result.data);
        }
    };

    const deleteBeer = async (id) => {
        await axios.delete(`https://soparla-mpp.crabdance.com/beers/${id}`);
        loadBeers();
    }

    const onSortByPrice = () =>{
        setSortedByPrice(true);
        setSortedByProdYear(false)
        setSortedByProdNrOfBreweries(false);
    }

    const onSortByProdYear = () =>{
        setSortedByProdYear(true);
        setSortedByPrice(false)
        setSortedByProdNrOfBreweries(false);
    }

    const onSortByProdNrOfBreweries = () =>{
        setSortedByProdNrOfBreweries(true);
        setSortedByPrice(false)
        setSortedByProdYear(false);
    }

    const nextPage = () =>{
        if(pageNr!==maxPage) {
            setSortedByPrice(false);
            setPageNr(pageNr + 100);
        }
    }

    const prevPage = () =>{
        if(pageNr!==1) {
            setSortedByPrice(false);
            setPageNr(pageNr - 100);
        }
    }

    const changePage = (nr) =>{
        document.getElementById("bt1").hidden=false;
        document.getElementById("bt2").hidden=false;
        document.getElementById("bt3").hidden=false;
        document.getElementById("bt4").hidden=false;
        if(nr<300){
            document.getElementById("bt1").hidden=true;
            document.getElementById("bt2").hidden=true;
        }
        if(nr>maxPage-200){
            document.getElementById("bt1").hidden=true;
            document.getElementById("bt2").hidden=true;
        }
        setPageNr(nr);
    }

    const firstPage = () =>{
        changePage(1);
    }

    const lastPage = () =>{
        changePage(maxPage);
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
            <div>
                <div>
                    <button className="btn btn-primary mx-2"  onClick={()=>onSortByPrice()}>Sort by price</button>
                    <button className="btn btn-primary mx-2"  onClick={()=>onSortByProdYear()}>Stats by producer year</button>
                    <button className="btn btn-primary mx-2"  onClick={()=>onSortByProdNrOfBreweries()}>Sort by producer number of breweries</button>
                </div>
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Producer Name</th>
                        <th scope="col">Producer Founding Year</th>
                        <th scope="col">Producer Number Of Breweries</th>
                        <th scope="col">Color</th>
                        <th scope="col">Alcohol Level</th>
                        <th scope="col">Price</th>
                        <th scope="col">Packaging</th>
                        <th scope='col'>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {beers.map((beer) => (
                        <tr>
                            <td>{beer.id}</td>
                            <td>{beer.name}</td>
                            <td>{beer.prodName}</td>
                            <td>{beer.prodYear}</td>
                            <td>{beer.prodNrOfBreweries}</td>
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
                <div>
                    <button className="btn btn-outline-primary mx-2" onClick={()=>firstPage()}>First Page</button>
                    <button className="btn btn-outline-primary mx-2" onClick={()=>prevPage()}>Prev Page</button>
                    <button id={"bt1"} className="btn btn-outline-primary mx-2" onClick={()=>changePage(pageNr-200)}>{(pageNr-200)%100}</button>
                    <button id={"bt2"} className="btn btn-outline-primary mx-2" onClick={()=>changePage(pageNr-100)}>{(pageNr-100)%100}</button>
                    <button className="btn btn-outline-primary mx-2" onClick={()=>changePage()}>{pageNr}</button>
                    <button id={"bt3"} className="btn btn-outline-primary mx-2" onClick={()=>changePage()}>{(pageNr+100)%100}</button>
                    <button id={"bt4"} className="btn btn-outline-primary mx-2" onClick={()=>changePage()}>{(pageNr+200)%100}</button>
                    <button className="btn btn-outline-primary mx-2" onClick={()=>nextPage()}>Next Page</button>
                    <button className="btn btn-outline-primary mx-2" onClick={()=>lastPage()}>Last Page</button>
                </div>
            </div>
        </div>
    );
}