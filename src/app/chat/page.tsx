'use client';

import { useChat } from 'ai/react';

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages, reload } = useChat({
    api: 'api/chat/v2',
  });

  const handleDelete = (id: string) => {
    setMessages(messages.filter(message => message.id !== id))
  }

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map(message => (
        <div key={message.id}>
          {message.role === 'user' ? 'User: ' : 'AI: '}
          {message.content + '  '}
          <button onClick={() => handleDelete(message.id)}>Delete</button>
        </div>
      ))}
      {isLoading ? <div>AI: ...</div> : ''}
      <form onSubmit={handleSubmit}>
        <input 
            name="prompt"
            className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
            value={input}
            onChange={handleInputChange}
            id="input"
        />
        <button className="fixed bottom-0 mb-10 ml-80 border rounded bg-slate-500" type="submit">Submit</button>
        {/** 
         * <button className="fixed bottom-0 mb-10 ml-96 border rounded bg-slate-500" onClick={reload} disabled={isLoading}>
            Regenerate
          </button>
        */}
      </form>
    </div>
  );
}
