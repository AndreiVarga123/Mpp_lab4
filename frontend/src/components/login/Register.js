import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";
import PreApp from "../../PreApp";
import App from "../../App";

export default function Register() {

    let navigate=useNavigate();

    const[error,setError] = useState("");
    const [user,setUser] = useState({
        userName:"",
        password:"",
        activated:false
    });
    const [profile,setProfile] = useState({
        email:"",
        birthday:"",
        description:"",
        address:""
    });


    const [token,setToken] = useState("");

    const{userName,password}=user;
    const{email,birthday,description,address}=profile;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onProfileInputChange = (e) =>{
        setProfile({ ...profile, [e.target.name]: e.target.value });
    }
    const onSubmit =async (e) => {
        e.preventDefault();
        console.log([user,profile]);
        const result = await axios.post("https://soparla-mpp.crabdance.com:80/register",[user,profile],{
            headers: {
                'Content-Type': 'application/json'
            }});
        if(result.data[0]=="good"){
            setToken(result.data[1]);
            document.getElementById("main").hidden=true;
            document.getElementById("confirm").hidden=false;
        }
        else{
            setError(result.data[1]);
            document.getElementById("dialogToggle").click();
        }
    };

    const confirmation = async(e)=>{
        e.preventDefault();
        const result = await axios.post(`https://soparla-mpp.crabdance.com:80/register/${token}`);
        console.log(result.data);
        if(result.data=="activated"){
            const root = ReactDOM.createRoot(document.getElementById('root')) ;
            root.render(
                <React.StrictMode>
                    <App/>
                </React.StrictMode>
            );
            navigate("/")
        }
        else{
            setError(result.data);
            document.getElementById("dialogToggle").click();
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div hidden={true} id="confirm" className="col-md-6 shadow offset-md-3 border rounded mx-auto p-4 mt-2" align={"center"}>
                    <h2 className="text-center m-4">Registration successful</h2>
                    <form onSubmit={(e)=>confirmation(e)}>
                        <div className="mb-3">
                            <label>To activate your account please press the button below</label>
                        </div>
                        <button type="submit" className="btn btn-outline-primary">Confirm account</button>
                    </form>
                </div>



                <div id="main" className="col-md-6 shadow offset-md-3 border rounded mx-auto p-4 mt-2">
                    <h2 className="text-center m-4">Register New User</h2>

                    <button id="dialogToggle" type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal " hidden={true}></button>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">{error}</h5>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className="mb-3">
                            <label>Username</label>
                            <input
                                type = {"text"}
                                className={"form-control"}
                                placeholder={"Enter username"}
                                name={"userName"}
                                value={userName}
                                onChange={(e)=>onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Password</label>
                            <input
                                type = {"text"}
                                className={"form-control"}
                                placeholder={"Enter password"}
                                name={"password"}
                                value={password}
                                onChange={(e)=>onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Email</label>
                            <input
                                type = {"text"}
                                className={"form-control"}
                                placeholder={"Enter text"}
                                name={"email"}
                                value={email}
                                onChange={(e)=>onProfileInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Birthday</label>
                            <input
                                type = {"date"}
                                className={"form-control"}
                                placeholder={"Enter birthday"}
                                name={"birthday"}
                                value={birthday}
                                onChange={(e)=>onProfileInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Description</label>
                            <input
                                type = {"text"}
                                className={"form-control"}
                                placeholder={"Enter description"}
                                name={"description"}
                                value={description}
                                onChange={(e)=>onProfileInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Address</label>
                            <input
                                type = {"text"}
                                className={"form-control"}
                                placeholder={"Enter address"}
                                name={"address"}
                                value={address}
                                onChange={(e)=>onProfileInputChange(e)}
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-primary">Submit</button>
                        <Link  className="btn btn-outline-danger mx-2" to="/login">Cancel</Link>
                    </form>

                </div>
            </div>
        </div>
    )
}