import React from 'react'

import { logout } from '../../../utils/login';

export default function Logout(props) {

    const handleClick = async()=>{
        const res = await logout();
        props.setAuth(res);
    }

    return (
        <button onClick={handleClick}>
            Logout
        </button>
    )
}