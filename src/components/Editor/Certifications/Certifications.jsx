import React from 'react'

export default function Certifications(props) {

    const certifications = props.data || [];

    const createCertifcations = ()=> {
        
        if(!certifications){
            return <li>No certifications found</li>
        }

        return certifications.map((certification, i)=> {
            return <li key={i}><p>{certification.text}</p></li>
        })

    }

    return (
        <div className="certification-container">
            <h2>certifications</h2>
            <ul>
                {createCertifcations()}
            </ul>
        </div>
    )
}
