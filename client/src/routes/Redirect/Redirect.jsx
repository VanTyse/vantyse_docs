import React, {useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid'
import { Context } from '../../context/context';


function Redirect() {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    useEffect(() => {
        if (user){
            navigate(`/documents/${uuidv4()}`)  
        }
        else{
            navigate(`/auth`)  
        }
    }, [])

  return (
    <div></div>
  )
}

export default Redirect