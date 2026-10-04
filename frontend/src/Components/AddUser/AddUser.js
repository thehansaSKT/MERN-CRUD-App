import React from 'react';
import Nav from '../Nav/nav'
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function AddUser() {
  const history=useNavigate();
  const [inputs,setInputs]=useState({
    name:"",
    gmail:"",
    age:"",
    address:""
  })
  const handleChange=(e)=>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value, 
    }));
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(()=>history('/userdetails'))
  }
  const sendRequest=async()=>{
    await axios.post("http://localhost:5005/users",{
    name: inputs.name,
    gmail: inputs.gmail,
    age: Number(inputs.age),
    address: inputs.address,
    }).then (res=>res.data);
    
  }
  return (
    <div>
      <Nav/>
      <h1>Add User</h1>
        <form onSubmit={handleSubmit}>

                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={inputs.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="gmail"
                        value={inputs.gmail}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={inputs.age}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={inputs.address}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                <button type="submit">
                    Add User
                </button>

            </form>
     
    </div>
  );
}

export default AddUser;
