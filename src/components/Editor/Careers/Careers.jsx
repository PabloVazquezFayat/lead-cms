import React from 'react'

export default function Careers(props) {

    const { backgroundColor, button, header, logo, paragraph} = props.data || {};

    const componentStyle = {background: backgroundColor}

    return (
        <div className='careers-container capture' style={componentStyle}>
            <div className='careers-wrapper'>
                <div className='careers-content'>
                    <img src={logo} alt="lead-logo"/>
                    <h2>
                        {header}
                    </h2>
                    <p>{paragraph}</p>
                </div>
                <div className='careers-content-cta'>
                    <a href="/careers">{button || 'Button Text'}</a>
                </div>
            </div>
        </div>
    )
}
