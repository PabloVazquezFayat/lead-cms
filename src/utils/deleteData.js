import axios from 'axios';
import { urls } from './urls';
import ErrorHandler from '../components/Errors/Error';

const deleteMessage = async (id)=> {
    
    const url = 'http://localhost:5000'+urls.messages.delete;

    try{
        const res = await axios.post(url, { id: id });
        return res.data;
    }catch(error){
        ErrorHandler(error);
    }

}

export {
    deleteMessage
}


