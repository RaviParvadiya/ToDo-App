import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import './Todo.css'

function SignIn() {
  const navigate = useNavigate();

  const handleSignIn = () => {
      let uid = uuidv4();
      navigate("/home");
      window.localStorage.setItem("key", uid);
  };

  return (
    <div className="SignIn">
      <div className="container">
        <h1>Todo-Application</h1>
        <button onClick={handleSignIn}>Sign In</button>
        
      </div>
    </div>
  );
}

export default SignIn;
