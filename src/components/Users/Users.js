import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users,setUsers]=useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/users')
        .then(res => res.json())
        .then(data => setUsers(data))
    },[]);
    //delete user
    const handleDeleteId=id=>{
        const proceed=window.confirm('Are you sure,you want to delete?')
        if(proceed){
            const url=`http://localhost:5000/users/${id}`;
        fetch(url,{
            method:"DELETE",
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount >0){
                alert('Delete successfully user');
                const remainingUser=users.filter(user=> user._id !==id)
                setUsers(remainingUser);
            }
        })
        }
    }
    return (
        <div>
            <h2>Users available:{users.length}</h2>
            <ul>
                {
                    users.map(user => <li
                        key={user._id}
                    >{user.name} :: {user.email}
                    <button onClick={()=>handleDeleteId(user._id)}>
                        x
                    </button>
                    <Link to={`/users/update/${user._id}`}>
                    <button>update</button>
                    </Link>
                    </li>)
                }
            </ul>
        </div>
    );
};

export default Users;