import React from 'react'

export default function Footer(props) {

    const {
        address,
        backgroundImage,
        city,
        days,
        email,
        facebook,
        fax,
        hours,
        instagram,
        linkedin,
        logo,
        overlayColor,
        paragraph,
        phone,
        smText,
        state,
        twitter,
        zipcode

    } = props.data || {}

    const componentStyle = {backgroundImage: `url(${backgroundImage})`};
    const footerOverlayStyle = {background: overlayColor}

    return (
        <div className='footer-container' style={componentStyle}>
            <div className='footer-overlay' style={footerOverlayStyle}>
                <div className='footer-social'>
                    <div className='footer-social-wrapper'>
                        <p>{smText || 'Social Media'}</p>
                        <ul>
                            {
                                facebook ? <li><a href={facebook}><i className="fab fa-facebook-f footer-sm-box"></i></a></li> : null
                            }
                            {
                                instagram ? <li><a href={instagram}><i className="fab fa-instagram footer-sm-box"></i></a></li> : null
                            }
                            {
                                twitter ? <li><a href={twitter}><i className="fab fa-twitter footer-sm-box"></i></a></li> : null
                            }
                            {
                                linkedin ? <li><a href={twitter}><i className="fab fa-twitter footer-sm-box"></i></a></li> : null
                            }
                        </ul>
                    </div>
                </div>
                <div className='footer-wrapper'>
                    <div className='footer-content'>
                        <img src={logo} alt="lead-logo" className='footer-logo'/>
                        <p className='footer-paragraph' >{paragraph}</p>
                    </div>
                    <div className='footer-content'>
                        <h3>links</h3>
                        <ul className='footer-nav-links'>
                            <li><a href="/">lead home page</a></li>
                            <li><a href="/about">learn about us</a></li>
                            <li><a href="/projects">see our projects</a></li>
                            <li><a href="/news">follow our newsletter</a></li>
                            <li><a href="/careers">see our career opportunities</a></li>
                            <li><a href="/contact">contact us today</a></li>
                        </ul>
                    </div>
                    <div className='footer-content'>
                        <h3>message us</h3>
                        <form>
                            <input type="text" name="name" placeholder="Full name"/>
                            <input type="text" name="subject" placeholder="Subject"/>
                            <input type="email" name="email" placeholder="Email"/>
                            <textarea name="message" id="footer-message" cols="30" rows="10" placeholder="Message"/>
                            <button type="submit">Send</button>
                        </form>
                    </div>
                    <div className='footer-content'>
                        <h3>contact info</h3>
                        <ul className='footer-address-list'>
                            <li>
                                <i className="fas fa-map-marker-alt"></i>
                                <p className='footer-contact-text'> 
                                    {address} {city}, {state} {zipcode}
                                </p>
                            </li>
                            <li>
                                <i className="fas fa-phone"></i>
                                <p className='footer-contact-text'>{phone}</p>
                            </li>
                            <li>
                                <i className="fas fa-fax"></i>
                                <p className='footer-contact-text'>{fax}</p>
                            </li>
                            <li>
                                <i className="fas fa-envelope"></i>
                                <p className='footer-contact-text'>{email}</p>
                            </li>
                            <li>
                                <i className="fas fa-calendar-day"></i>
                                <p className='footer-contact-text'>{days}</p>
                            </li>
                            <li>
                                <i className="fas fa-hourglass-start"></i>
                                <p className='footer-contact-text'>{hours}</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='footer-copyright'>
                    <p>&copy; 2020 Lead Engineering Contractors</p>
                </div>
            </div>
        </div>
    )
}

