import React, { useState, useEffect } from 'react'

import { fetchMessagesData} from '../../../utils/fetchData'
import { deleteMessage } from '../../../utils/deleteData'

export default function Message(props) {

    const [messages, setMessages] = useState([]);

    useEffect(()=> {
        if(props.data && props.data.messages){
            setMessages(props.data.messages)
        }
    }, [props.data]);

    const handleDeleteMessage = async(e)=> {

        const res = await deleteMessage(e.target.id)

        if(res){

            const fetchedMessages = await fetchMessagesData();

            setMessages((prevSate)=> {
                if(fetchedMessages){
                    setMessages(fetchedMessages);
                }

                return prevSate;
            });
        }
    }

    const createMessages = ()=> {

        if(!messages || messages.length === 0){
            return <li>No messages found...</li>
        }

        return messages.map((message, i)=> {
            return <li key={i}>
                        <div className="message-contact-info">
                            <p>name: {message.name}</p>
                            <p>email: {message.email}</p>
                        </div>
                        <div className="message-body">
                            <p>subject: {message.subject}</p>
                            <p>{message.message}</p>
                        </div>
                        <div className="messages-actions">
                            <button 
                                id={message._id} 
                                className="delete-message btn-action btn-delete"
                                onClick={handleDeleteMessage}
                            >delete</button>
                        </div>
                    </li>
        })

    }
    
    return (
        <div className="messages-container">
            <ul>
                {createMessages()}
            </ul>
        </div>
    )
}
