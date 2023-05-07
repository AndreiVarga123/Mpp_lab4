import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";
import PreApp from "../../PreApp";
import App from "../../App";

export default function Login() {

    let navigate=useNavigate();

    const [user,setUser] = useState({
        userName:"",
        password:"",
        activated:false
    });
    const[error,setError] = useState("");

    const{userName,password}=user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const onSubmit =async (e) => {
        e.preventDefault();
        const result = await axios.post("http://localhost:80/login",user);
        console.log(result.data);
        if(result.data[0]=="good"){
            const root = ReactDOM.createRoot(document.getElementById('root')) ;
            root.render(
                <React.StrictMode>
                    <App/>
                </React.StrictMode>
            );
            navigate("/")
        }
        else{
            setError(result.data[1]);
            document.getElementById("dialogToggle").click();
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 shadow offset-md-3 border rounded mx-auto p-4 mt-2" align={"center"}>
                    <h2 className="text-center m-4">Login</h2>

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
                        <button type="submit" className="btn btn-outline-primary">Login</button>
                        <Link  className="btn btn-outline-danger mx-2" to="/register">Register</Link>
                    </form>

                </div>
            </div>
        </div>
    )
}