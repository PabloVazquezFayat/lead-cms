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

const fetchNavbarData = async ()=> {

    const url = 'http://localhost:5000'+urls.navbar.read;

    try{
        const data = await axios.get(url);
        return data.data.navbar;
    }catch(error){
        ErrorHandler(error);
    }

}

const fetchCarouselData = async ()=> {
    
    const url = 'http://localhost:5000'+urls.carousel.read;

    try{
        const data = await axios.get(url);
        return data.data.slides;
    }catch(error){
        ErrorHandler(error);
    }

}

const fetchMissionData = async ()=> {

    const url = 'http://localhost:5000'+urls.missionStatement.read;

    try{
        const data = await axios.get(url);
        return data.data.missionStatement
    }catch(error){
        ErrorHandler(error);
    }

}

const fetchFeaturedProjectsPanelData = async ()=> {

    const url = 'http://localhost:5000'+urls.projectsPanel.read;

    try{
        const data = await axios.get(url);
        return data.data.projectsPanel;
    }catch(error){
        ErrorHandler(error);
    }

}

const fetchFeaturedProjectsData = async ()=> {

    const url = 'http://localhost:5000'+urls.projects.read;

    try{
        const data = await axios.get(url);
        return data.data.projects;

    }catch(error){
        ErrorHandler(error);
    }
}

const fetchRecentNewsData = async ()=> {

    const url = 'http://localhost:5000'+urls.latestNews.read;

    try{
        const data = await axios.get(url);
        return data.data.recentNews;
    }catch(error){
        ErrorHandler(error);
    }
}

const fetchCareersData = async ()=> {

    const url = 'http://localhost:5000'+urls.careers.read;

    try{
        const data = await axios.get(url);
        return data.data.careers;
    }catch(error){
        ErrorHandler(error);
    }
}

const fetchFooterData = async ()=> {
    
    const url = 'http://localhost:5000'+urls.footer.read;

    try{
        const data = await axios.get(url);
        return data.data.footer;
    }catch(error){
        ErrorHandler(error);
    }
}

export { 
    fetchAll, 
    fetchNavbarData, 
    fetchCarouselData, 
    fetchMissionData,
    fetchFeaturedProjectsPanelData,
    fetchFeaturedProjectsData,
    fetchRecentNewsData,
    fetchCareersData,
    fetchFooterData
};