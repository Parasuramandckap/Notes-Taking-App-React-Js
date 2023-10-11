import React, { useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
const Deletetodo = () => {
    const {id} = useParams();
  const navigate = useNavigate();
    const url = `http://localhost:3000/todos/${id}`
    useEffect(()=>{
        fetch(url,{
            method:"DELETE",
            headers:{
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then(res=>res.json())
        .then(data=>{
            navigate("/");
        })
    })
    return ( 
        <div>delete page</div>
     );
}
 
export default Deletetodo;