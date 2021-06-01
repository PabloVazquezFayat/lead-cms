import React, { useState, useEffect } from 'react'

import { fetchApplicationsData } from '../../../utils/fetchData'
import { deleteApplication } from '../../../utils/deleteData'

export default function Applications(props) {

    const [applications, setApplicationData] = useState([]);

    useEffect(()=> {
        if(props.data && props.data.applications){
            setApplicationData(props.data.applications);
        }
    }, [props.data]);

    const getApplicationData = async ()=> {
        const data = await fetchApplicationsData();

        if(data){
            setApplicationData(data);
        }
    }

    const handleDeleteApplication = async(e)=> {
            
        const res = await deleteApplication(e.target.id);

        console.log(res);

        if(res){

            const fetchedApplications = await getApplicationData();

            setApplicationData((prevState)=> {
                if(fetchedApplications){
                    setApplicationData(fetchedApplications);
                }

                return prevState;
            });

        }

    }
    
    const createApplications = ()=> {
        
        if(!applications || applications.length === 0){
            return <li>No applications found</li>
        }

        return applications.map((application, i)=> {
            return <li className="application-data-container" key={i}>
                        <div className="application-data-wrapper">
                            <div className="application-bio">
                                <p>{application.name}</p>
                                <p>{new Date(application.date).toString().substr(3,12)}</p>
                                <p>{application.phone}</p>
                                <p>{application.email}</p>
                            </div>
                            <div className="application-position-container">
                                <div className="application-position">
                                    <p>{application.position}</p>
                                </div>
                                <div className="application-position">
                                    <p>{application.salary}</p>
                                </div>
                                <div className="application-message">
                                    <p>{application.message}</p>
                                </div>
                            </div>
                            <div className="application-resume-container">
                                <div className="application-resume">
                                    {
                                    application.resume 
                                    ? <a href={application.resume} target="_blank" rel="noreferrer">view resume</a> 
                                    : <p>no resume attached</p>
                                    }
                                    <embed src={application.resume} alt="no resume attached" />
                                </div>
                                <div className="applicartion-actions">
                                    <button 
                                        id={application._id}
                                        className="delete-application btn-action btn-delete"
                                        onClick={handleDeleteApplication}
                                    >
                                        delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
        });

    }

    return (
        <div>
            <ul>
                {createApplications()}
            </ul>
        </div>
    )
}
