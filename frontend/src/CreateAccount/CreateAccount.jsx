import React from "react";
import './CreateAccount.css'
import Home from "../pages/Home/Home";

const CreateAccount = () => {
    return ( 
        <div className="createAccount">
            <Home/>
            <div className="sub-create-account">
                <h2 className="create-account-title">Create Account Form</h2>
                <label className="create-account-labels">Name*</label>
                <input className="create-account-inputs" type="text" />
                <label className="create-account-labels">Last Name*</label>
                <input className="create-account-inputs" type="text" />
                <label className="create-account-labels">UserName*</label>
                <input className="create-account-inputs" type="text" />
                <label className="create-account-labels">Phone Number*</label>
                <input className="create-account-inputs" type="text" />
                <label className="create-account-labels">Email Adress*</label>
                <input className="create-account-inputs" type="text" />
                <label className="create-account-labels">Password</label>
                <input className="create-account-inputs" type="text" />
                <label className="create-account-labels">confirm Password</label>
                <input className="create-account-inputs" type="text" />
                <label className="create-account-labels">Profile Picture</label>
                <input className="create-account-picture" type="file" />

                <button>Create Account</button>
            </div>
        </div>
     );
}
export default CreateAccount;