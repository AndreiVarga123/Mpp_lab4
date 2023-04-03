import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function SortBeer() {
    const [beers,setBeers]= useState([]);

    useEffect(() => {
        loadBeer();




    }, []);

    function compare( a, b ) {
        if ( a.age < b.age ){
            return -1;
        }
        if ( a.age > b.age ){
            return 1;
        }
        return 0;
    }

    const loadEmployee = async () => {
        const result = await axios.post("api/beers/filter",filterNr, {
            headers: {
                'Content-Type': 'application/json'
            }});
        setBeers(result.data);
    }

    // const SortEmployee = async () => {
    //     employees.sort((a, b) => (a.age > b.age) ? 1 : -1)
    //     setEmployees(employees);

    // }



    const handleSort = (e) => {

        const sortedBeers = [...beers].sort((a,b)=>{
            return a.price > b.price ?1 : -1
        });
        setBeers(sortedBeers);
    }








    return (

        <div className='container'>
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
                        </tr>
                    ))}
                    </tbody>
                </table>


                <Link className="btn btn-primary" to="/">Back to Home</Link>
                <div><button className="btn btn-secondary" onClick={handleSort}>Sort by Price</button></div>



            </div>
        </div>
    );
}