import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const UpdateUser = () => {
    const {id}=useParams();
    const [user,setUser]=useState({});
    useEffect(()=>{
        const url=`http://localhost:5000/users/${id}`;
        fetch(url)
        .then(res => res.json())
        .then(data => setUser(data))
    },[]);
    const nameUpdate=e=>{
        console.log(e.target.value);
        const updateName=e.target.value;
        const UpdateUser={name:updateName,email:user.email}
        setUser(UpdateUser);
    }
    const emailUpdate=e=>{
        const updateEmail=e.target.value;
        //specilall system
        const updateUser={...user}
        updateUser.email=updateEmail;
        // const updateUserEmail={name:user.name,email:updateEmail}
        setUser(updateUser);
    }
    const handleUpdateUser=e=>{
        const url=`http://localhost:5000/users/${id}`;
        fetch(url,{
            method:'PUT',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data =>{
            if(data.modifiedCount>0){
                alert("update successfully")
                setUser({});
            }
        });
            e.preventDefault();
    }
    return (
        <div>
            <h2>This is Update User{user.name}::{user.email}</h2>
            <p>{id}</p>
            < form onSubmit={handleUpdateUser}>
                <input type ="text" onChange={nameUpdate} value={user.name || ''} />
                <input type='text'onChange={emailUpdate} value={user.email || ''} />
                <input type='submit' value="Update"/>
            </form>
        </div>
    );
};

export default UpdateUser;