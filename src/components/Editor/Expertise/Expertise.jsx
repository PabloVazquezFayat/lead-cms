import React from 'react'

export default function Expertise(props) {

    console.log(props.data)

    const {services, servicesPanel} = props.data || {};
    const {backgroundColor, header} = servicesPanel || {};

    const createServices = ()=> {

        if(!services){
            return <li>No services found</li>
        }

        return services.map((service, i)=> {
            return  <li key={i}>
                        <img src={service.image} alt="service="/>
                        <p>{service.title}</p>
                    </li>
        })

    }

    const style = {
        background: backgroundColor || '#fff',
    }

    return (
        <div className="services-container" style={style}>
            <h2>{header}</h2>
            <ul>
                {createServices()}
            </ul>
        </div>
    )
}
