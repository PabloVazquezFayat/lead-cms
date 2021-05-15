import React from 'react';
import { Redirect} from 'react-router-dom';

export default function Auth(props) {

    const checkUserIsAuthenticated = ()=> {
        return true;
    }

    const redirectTo = ()=> {

        const auth = checkUserIsAuthenticated();

        if(auth === true){
            return props.children;
        }

        return <Redirect to="/login"/> 

    }

    return (
        <div>
            {redirectTo()}
        </div>
    )
}
