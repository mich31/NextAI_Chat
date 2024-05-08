'use client';

import { useActions, useUIState } from 'ai/rsc';

export default function Page() {
    const { sendMessage } = useActions();
    const [messages, setMessages] = useUIState();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const message =  event.target.message.value;
    
        setMessages([ ...messages, { id: Date.now(), role: 'user', display: message } ]);
    
        const response = await sendMessage(message);
        setMessages([ ...messages, { id: Date.now(), role: 'assistant', display: response } ]);
    };
    
      return (
        <>
          <ul>
            {messages.map(message => (
              <li key={message.id}>{ message.role === 'user' ? `User: ${message.display}` : `AI: ${message.display}` }</li>
            ))}
          </ul>
          <form onSubmit={handleSubmit}>
            <input type="text" name="message" />
            <button type="submit">Send</button>
          </form>
        </>
      );
}
