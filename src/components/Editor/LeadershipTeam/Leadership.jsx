import React from 'react'

export default function Leadership(props) {

    const {leadershipBanner, members } = props.data || {};
    const {background, header, paragraph} = leadershipBanner || {};

    const createMembers = ()=> {

        if(!members){
            return <li>Leadership members not found</li>
        }

        return members.map((member, i)=> {
            return <li key={i}>
                        <img className='member-pic' src={member.image} alt="member"/>
                        <div className='member-info'>
                            <h3>{member.name}</h3>
                            <p>{member.title}</p>
                            <p>{member.bio}</p>
                            {
                                member.social 
                                ?
                                <a href={member.social}><i className="fab fa-linkedin"></i></a>
                                :
                                null
                            }
                        </div>
                    </li>
        });

    }

    const containerStyle = {
        background: background || '#fff',
    }

    return (
        <div className='leadershipBanner-container'  style={containerStyle}>
            <div className='leadershipBanner-wrapper' data-aos="fade-right" data-aos-delay='250' data-aos-once="true">
                <h2>{header || 'Header text here'}</h2>
                <p>{paragraph || 'Paragraph text here'}</p>
            </div>
            <div className="leadershipMembers-container capture" style={containerStyle}>
                <ul>
                    {createMembers()}
                </ul>
                <div className="leadershipMembers-wrapper">
                </div>
            </div>
        </div>
    )
}
