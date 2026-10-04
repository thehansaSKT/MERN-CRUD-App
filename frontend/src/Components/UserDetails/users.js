import React from 'react';
import{useState,useEffect}from 'react';
import Nav from '../Nav/nav'
import axios from 'axios';
import User from '../Users/user';

const URL= "http://localhost:5005/users";

const fetchHanler = async()=>{
    return await axios.get(URL).then((res)=>res.data);
}
function Users() {
    const [users,setUsers]= useState([]);
    useEffect(()=>{
        fetchHanler().then((data)=>setUsers(data.users));
    },[])
  return (
    <div>
      <Nav/>
      
            <div>
                {users.map((user) => (
                    <User
                        key={user._id}
                        user={user}
                    />
                ))}
            </div>
    </div>
  );
}

export default Users;
