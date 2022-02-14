import React from 'react';
import {useRef} from 'react';

const AddUser = () => {
    const nameRef=useRef();
    const emailRef=useRef();
    const handleAddUser =(e)=>{
        const name=nameRef.current.value;
        const email=emailRef.current.value;
        const newUsers={name,email}
        fetch("http://localhost:5000/users",{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(newUsers)
        })
        .then(res => res.json())
        .then(data =>{
            if(data.insertedId){
                alert('successfully added this user')
                e.target.reset();
            }
        })
        e.preventDefault();
    }
    return (
        <div>
            <h2>Please is Add User</h2>
            < form onSubmit={handleAddUser}>
                <input type ="text" ref={nameRef} />
                <input type='text' ref={emailRef} />
                <input type='submit' value="AddUser"/>
            </form>
        </div>
    );
};

export default AddUser;