'use client';

import { PaperPlaneIcon } from '@radix-ui/react-icons';
import Message from '../ui/message';

export default function Page(){
    const message = 'I have a very long message to send. This is very long so I need to adapt this component.';
    return (
        <div className='flex flex-row'>
            <div className='min-h-screen basis-1/4 bg-blue-300 p-2'>Conversations</div>
            <div className='flex min-h-screen basis-3/4 flex-col bg-white'>
                <div className='mx-auto w-10/12 basis-11/12 bg-white px-2 py-2 rounded-xl mt-8 shadow-2xl'>
                    <Message content={message} role='ai'/>
                    <Message content='Hi, Hello, Good morning!' role='user'/>
                    <Message content='Hey!' role='ai'/>
                </div>
                <div className='flex mx-auto w-10/12 basis-1/12 py-4 space-x-4'>
                    <input 
                        type='text'
                        className='basis-11/12 rounded-lg border-2 border-blue-300 px-2 py-2 focus:border-blue-900'
                        placeholder='Type message..' 
                    />
                    <button 
                        className='px-2 py-2 basis-1/12 bg-blue-300 rounded-xl w-64 hover:opacity-80'
                    >
                        <PaperPlaneIcon className='w-6 h-6 mx-auto text-white'/>
                    </button>
                </div>
            </div>
        </div>
    );
}
