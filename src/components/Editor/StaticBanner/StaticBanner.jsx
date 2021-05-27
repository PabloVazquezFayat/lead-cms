import React from 'react'

export default function StaticBanner(props) {

    const page = props.page || '';
    const staticBanner = props.data || []
    const banner = staticBanner.find( banner => banner.page === page) || {};
    const { backgroundImage, overlayColor, header, paragraph } = banner || {};

    const style = {
        component: {
            backgroundImage: `url(${backgroundImage})`
        },
        overlay: {
            background: overlayColor
        }
    }

    return (
        <div className='static-banner-container' style={style.component}>
            <div className='static-banner-overlay' style={style.overlay}>
                <h1>{header || 'Header text here'}</h1>
                <h3>{paragraph || ''}</h3>
            </div>
        </div>
    )
}
