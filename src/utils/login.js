import axios from 'axios';


const login = async (user)=> {

    const url = 'http://localhost:3001/cms/login';

    try{
        const res = await axios.post(url, user, {withCredentials: true});
        return res;
    }catch(error){
        console.log(error);
    }
}

export { login }