import axios from 'axios';
import { urls } from './urls';
import ErrorHandler from '../components/Errors/Error';

const deleteMessage = async (id)=> {
    
    const url = `http://localhost:3001${urls.messages.delete}/${id}`

    try{
        const res = await axios.delete(url, {withCredentials: true});
        return res.data;
    }catch(error){
        ErrorHandler(error);
    }

}

const deleteApplication = async (id)=> {

    const url = `http://localhost:3001${urls.applications.delete}/${id}`

    try{
        const res = await axios.delete(url, {withCredentials: true});
        return res.data;
    }catch(error){
        ErrorHandler(error);
    }

}

export {
    deleteMessage,
    deleteApplication
}


