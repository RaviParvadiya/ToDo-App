import React from 'react';
import { useNavigate } from 'react-router-dom';
import {v4 as uuidv4} from "uuid";

function SignIn() {

    const navigate = useNavigate();

    const handleSignIn = () => {
        let uid = uuidv4();
        navigate('/home');
        window.localStorage.setItem("key", uid);
        // console.log(uid);
    }
  
  return (
    <div>
      <h1 className="text-3xl text-white font-bold">Todo-Application</h1>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  )
}

export default SignIn;