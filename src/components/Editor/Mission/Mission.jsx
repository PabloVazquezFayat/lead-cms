import React from 'react'

export default function Mission(props) {

    const {header, paragraph, keywords} = props.data || {};

    const createKeywords = ()=> {
        if(!keywords){
            return <li>Keywords not found</li>
        }

        return  keywords.map((keyword, i)=> {
            return <li key={i}>
                        <div className="mission-keyword-container">
                            {keyword}
                        </div>
                    </li>
        })
    }

    return (
        <div className="mission-container">
            <div className="mission-wrapper">
                <div className="mission-header">
                    <h2>{header || 'Header goes here'}</h2>
                    <p>{paragraph || 'Paragraph text goes here'}</p>
                </div>
                <div className="mission-devider">
                    <hr/>
                        <i className="fas fa-ellipsis-h fa-2x"></i>
                    <hr/>
                </div>
                <div className="mission-keywords">
                    <ul>
                        {createKeywords()}
                    </ul>
                </div>
            </div>
        </div>  
    )
}
