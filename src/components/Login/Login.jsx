import React, { useState } from 'react';

import { login } from '../../utils/login'

export default function Login() {

    const [creds, setCreds] = useState({});

    const handleClick = (e)=> {
        e.preventDefault();
        loginUser();
    }

    const loginUser = async ()=>{
        const res = await login(creds);
        console.log(res);
    }

    const handleInput = (e)=> {

        const { name, value } = e.target;

        setCreds((prevState)=> {

            if(name === 'email'){
                return {...prevState, email: value};
            }
            
            if(name === 'password'){
                return {...prevState, password: value};
            }

            return prevState;
        });

    }

    return (
        <div className="login-page">
            <div className="login-container">
                <form>
                    <input type="email" name="email" placeholder="Email" onChange={handleInput}/>
                    <input type="password" name="password" placeholder="password" onChange={handleInput}/>
                    <button type="button" onClick={handleClick}>Login</button>
                </form>
            </div>
        </div>
    )
}
