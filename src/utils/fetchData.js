import axios from 'axios';
import { urls, allReadUrls} from './urls';
import ErrorHandler from '../components/Errors/Error';

const fetchAll = async ()=> {

    const readUrls = allReadUrls().map( url => axios.get(url));

    try{

        const data = await axios.all(readUrls);
        const mappedData = data.map( data => data.data);

        const dataObject = {}

        for(let i = 0; i < mappedData.length; i++){
            dataObject[Object.keys(mappedData[i])[0]] = mappedData[i][Object.keys(mappedData[i])[0]];
        }
        
        return dataObject;

    }catch(error){
        ErrorHandler(error);
    }

}

export { fetchAll }