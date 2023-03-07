import React, {useState, useContext} from 'react';
import { NavLink } from 'react-router-dom';
import loginpic from "../images/login.svg";
import {useHistory} from 'react-router-use-history';

import { UserContext } from '../App';

const Login = () => {

    const {state, dispatch} = useContext(UserContext);  

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();

    const res = await fetch('/signin', {
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        }, 
        body:JSON.stringify({
            email,
            password
        })
    });

    const data = res.json();

    if (res.status === 400 || !data) {
        window.alert("Invalid Credentials");

    } else{
        dispatch({type:"USER", payload:true})
        window.alert("Login Successfull");
        history.push("/");
    }
    }


  return (
    <>
      <h2 className="signup">Sign in</h2>
            <div className="form " method="POST">
        
                <div className="form-body">
                    

                    <div className="email">
                        <label className="form__label" for="email">Email </label>
                        <input type="email" name="email" id="email" className="form__input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email " />
                    </div>
                    
                    <div className="password">
                        <label className="form__label" for="password">Password </label>
                        <input className="form__input" name="password" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" />
                    </div>
                   
                </div>
                <div class="footer">
                    <button type="submit" className="btn btn-primary" onClick={loginUser}>Log in</button>
                </div>
                <div className="signup-image">
                    <figure>
                        <img src={loginpic} alt="registration pic" width="80" height="140" /> 
                    </figure>
                    <NavLink to="/signup" className="nav-link">Create an Account</NavLink>
                </div>
            </div>
    </>
   
    )
}

    export default Login