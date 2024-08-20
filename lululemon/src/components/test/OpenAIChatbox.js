import React, { useState } from 'react';
import axios from 'axios';

export const OpenAIChatboxTest = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = `You: ${input}`;
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        try {
            const response = await axios.post('http://localhost:3399/openAI', { input });
            const aiMessage = `AI: ${response.data.data}`;
            setMessages((prevMessages) => [...prevMessages, aiMessage]);
        } catch (error) {
            console.error('Error communicating with AI assistant:', error);
            setMessages((prevMessages) => [...prevMessages, 'AI: Sorry, something went wrong.']);
        }

        setInput('');
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc' }}>
            <div style={{ maxHeight: '500px', overflowY: 'auto', paddingBottom: '10px' }}>
                {messages.map((message, index) => (
                    <div key={index} style={{ margin: '5px 0' }}>{message}</div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask something..."
                style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
            />
            <button onClick={handleSendMessage} style={{ width: '100%', padding: '10px' }}>
                Send
            </button>
        </div>
    );
};
