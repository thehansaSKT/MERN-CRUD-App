import React from 'react';


function User(props) {
  const {_id,name,gmail,age,address}=props.user;
  return (
    <div>
      <h1>User Display</h1>
      <br/>
      <h1>ID: {_id}</h1>
      <h2>Name: {name}</h2>
      <h2>Email: {gmail}</h2>
      <h2>Age: {age}</h2>
      <h2>Address: {address}</h2>
      <button>Update</button>
      <button>Delete</button>
    </div>
  );
}

export default User;