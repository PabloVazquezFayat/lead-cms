import React from 'react'

export default function Recognitions(props) {

    const { recognitionsPanel, recognition } = props.data || {};
    const { backgroundColor, header } = recognitionsPanel || {};

    const createRecognitions = ()=> {
        
        if(!recognition){
            return <li>No recognitions found</li>
        }

        return recognition.map((recognition, i)=> {
            return  <li key={i}>
                        <a href={recognition.link}>
                            <img src={recognition.image} alt="org"/>
                            <div><p>{recognition.title}</p></div>
                        </a>
                    </li>
        });

    }

    const style = {
        background: backgroundColor || '#fff',
    }

    return (
        <div className="recognitions-container" style={style} >
            <h2 >{header || 'Header text here'}</h2>
            <ul>
                {createRecognitions()}
            </ul>
        </div>
    )
}
