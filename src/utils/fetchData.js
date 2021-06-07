import axios from 'axios';
import { domain, urls, allReadUrls} from './urls';
import ErrorHandler from '../components/Errors/Error';

const fetchAll = async ()=> {

    const readUrls = allReadUrls().map( url => axios.get(url, {withCredentials: true}));

    try{

        const data = await axios.all(readUrls);

        const mappedData = data.map( data => data.data);

        const dataObject = {}

        for(let i = 0; i < mappedData.length; i++){
            dataObject[Object.keys(mappedData[i])[0]] = mappedData[i][Object.keys(mappedData[i])[0]];
        }

        console.log(dataObject)
        
        return dataObject;

    }catch(error){
        ErrorHandler(error);
    }

}

const fetchNavbarData = async ()=> {

    // const url = domain+urls.navbar.read;

    // try{
    //     const data = await axios.get(url, {withCredentials: true});
    //     return data.data.navbar;
    // }catch(error){
    //     ErrorHandler(error);
    // }



}

const fetchCarouselData = async ()=> {
    
    const url = domain+urls.carousel.read;

    try{
        const data = await axios.get(url, {withCredentials: true});
        return data.data.slides;
    }catch(error){
        ErrorHandler(error);
    }

}

const fetchMissionData = async ()=> {

    const url = domain+urls.missionStatement.read;

    try{
        const data = await axios.get(url, {withCredentials: true});
        return data.data.mission
    }catch(error){
        ErrorHandler(error);
    }

}

const fetchFeaturedProjectsPanelData = async ()=> {

    const url = domain+urls.projectsPanel.read;

    try{
        const data = await axios.get(url, {withCredentials: true});
        return data.data.projectsPanel;
    }catch(error){
        ErrorHandler(error);
    }

}

const fetchFeaturedProjectsData = async ()=> {

    const url = domain+urls.projects.read;

    try{
        const data = await axios.get(url, {withCredentials: true});
        return data.data.projects;
    }catch(error){
        ErrorHandler(error);
    }
}

const fetchRecentNewsData = async ()=> {

    const url = domain+urls.latestNews.read;

    try{
        const data = await axios.get(url, {withCredentials: true});
        return data.data.latestNews;
    }catch(error){
        ErrorHandler(error);
    }
}

const fetchRecentNewsArticlesData = async ()=> {
    
    const url = domain+urls.newsArticle.read;

    try{
        const data = await axios.get(url, {withCredentials: true});
        return data.data.newsArticles;
    }catch(error){
        ErrorHandler(error);
    }
}

const fetchCareersData = async ()=> {

    const url = domain+urls.careers.read;

    try{
        const data = await axios.get(url, {withCredentials: true});
        return data.data.careers;
    }catch(error){
        ErrorHandler(error);
    }
}

const fetchFooterData = async ()=> {
    
    const url = domain+urls.footer.read;

    try{
        const data = await axios.get(url, {withCredentials: true});
        return data.data.footer;
    }catch(error){
        ErrorHandler(error);
    }
}

const fetchMessagesData = async ()=> {

    const url = domain+urls.messages.read;

    try{
        const res = await axios.get(url, {withCredentials: true});
        return res.data.messages;
    }catch(error){
        ErrorHandler(error);
    }
}

const fetchApplicationsData = async ()=> {

    const url = domain+urls.applications.read;

    try{
        const res = await axios.get(url, {withCredentials: true});
        return res.data.applications;
    }catch(error){
        ErrorHandler(error);
    }
}

const checkToken = async ()=> {

    const url = 'http://localhost:5000/cms/auth'

    try{
        const res = axios.get(url, {withCredentials: true});
        return res.data;
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
    fetchRecentNewsArticlesData,
    fetchCareersData,
    fetchFooterData,
    fetchMessagesData,
    fetchApplicationsData,
    checkToken
};