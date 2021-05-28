import React from 'react'

export default function Contact(props) {

    const { 
        address,
        background,
        header,
        paragraph,
        city,
        state,
        zipcode,
        phone,
        fax,
        email,
        days,
        hours
    } = props.data || {};

    const style = {
        background: background,
    }

    return (
        <div className='contact-container' style={style}>
            <div className='contact-wrapper'>
                <div className='contact-info'>
                    <h3>{header}</h3>
                    <p>{paragraph}</p>
                    <ul>
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
                            <p className='footer-contact-text'>${hours}</p>
                        </li>
                    </ul>
                </div>
                <div className='contact-form-container'>
                    <h3>message us</h3>
                    <form>
                        <input type="text" required placeholder="Full name"/>
                        <input type="text" required placeholder="Subject"/>
                        <input type="email" required placeholder="Email"/>
                        <textarea name="message" id="footer-message" cols="30" rows="10" placeholder="Message"></textarea>
                        <button type="submit">Send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
