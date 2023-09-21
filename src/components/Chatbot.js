import React, { useState } from 'react';
import moment from 'moment';
import ChatMessage from './chatMessage';

export default function Chatbot() {
    const [messages, setMessages] = useState([
        {
            message: 'Hi, may I have your name?',
        },
    ]);
    const [text, setText] = useState('');
    const [name, setName] = useState('');

    const analyze = (text) => {
        if (text.includes('hi') || text.includes('hai') || text.includes('hello')) {
            return `Hi, ${name}! How can I help you?`;
        } else if (text.includes('date')) {
            return moment().format('MMMM Do YYYY');
        } else if (text.includes('time')) {
            return moment().format('h:mm:ss a');
        } else if (text.includes('google link')) {
            return 'https://www.google.com';
        } else if (text.includes('interest')) {
            return 'Bank interest rate is 8.7%';
        } else if (text.includes('thank you')) {
            return 'Thanks for contacting me';
        }
        return "I can't understand your message. Can you rephrase it?";
    };

    const onSend = () => {
        let list = [...messages, { message: text, user: true }];

        if (!name) {
            // If the user hasn't provided their name yet, set it
            setName(text);
            list = [
                ...list,
                {
                    message: `Nice to meet you, ${text}! How can I assist you today?`,
                },
            ];
        } else {
            const reply = analyze(text);
            list = [...list, { message: reply }];
        }

        setMessages(list);
        setText('');
        setTimeout(() => {
            document.querySelector('#Copyright').scrollIntoView();
        }, 1);
    };

    return (
        <div>
            <div className='d-flex align-items-center justify-content-center'>
                <img
                    src='https://cdn3.iconfinder.com/data/icons/chat-bot-emoji-blue-filled-color/300/35456761Untitled-3-512.png'
                    alt='logo'
                    height={200}
                    width={200}
                />
                <h2 className='text-primary'>Chatbot</h2>
            </div>
            <div className='chat-message'>
                {messages.length > 0 &&
                    messages.map((data, index) => <ChatMessage key={index} {...data} />)}
                <div className='d-flex'>
                    <input
                        type='search'
                        className='form-control'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button type='button' className='btn btn-primary ms-3' onClick={onSend}>
                        Send
                    </button>
                </div>
                <div id='Copyright' className='mt-3'>
                    Copyright Reserved
                </div>
            </div>
        </div>
    );
}
