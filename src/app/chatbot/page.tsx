'use client';

import { PaperPlaneIcon } from '@radix-ui/react-icons';
import ChatMessage from '../ui/message';
import { useChat } from 'ai/react';

export default function Page(){
    const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages, reload } = useChat({
        api: 'api/chat/v2',
    });

    return (
        <div className='flex flex-row'>
            <div className='h-screen basis-1/4 bg-blue-300 p-2'>Conversations</div>
            <div className='flex h-screen basis-3/4 overflow-hidden flex-col bg-white'>
                <div className='mx-auto overflow-y-auto w-10/12 h-[90%] bg-white px-2 py-2 rounded-xl mt-8 shadow-xl'>
                    {messages.map((m) => (<ChatMessage message={m} key={m.id}/>))}
                </div>
                <form onSubmit={handleSubmit} className='flex mx-auto w-10/12 py-4 space-x-4'>
                    <input
                        id='input'
                        type='text'
                        name='message'
                        value={input}
                        onChange={handleInputChange}
                        className='basis-11/12 rounded-lg border-2 border-blue-300 px-2 py-2 focus:border-blue-900 shadow-2xl'
                        placeholder='Type message..' 
                    />
                    <button
                        type='submit'
                        className='px-2 py-2 basis-1/12 bg-blue-300 rounded-xl w-64 hover:opacity-90 shadow-2xl'
                    >
                        <PaperPlaneIcon className='w-6 h-6 mx-auto text-white'/>
                    </button>
                </form>
            </div>
        </div>
    );
}
