'use client';

import { useState } from 'react';
import { Textarea } from '@/app/ui/textarea';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { useChat } from 'ai/react';
import Message from '@/app/ui/message';

export default function Page() {
    const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages, reload } = useChat({
        api: '../api/chat/v2',
    });
    // const [inputValue, setInputValue] = useState('');
    
    return (
        <div className='flex flex-row h-full'>
            <div className='basis-[23%] bg-blue-100 p-4'>Conversations</div>
            <div className='flex flex-col basis-[77%] overflow-y-auto bg-slate-50'>
                <div className='mx-auto w-10/12  pt-4 h-full'>
                    {messages.map((m) => (<Message message={m} key={m.id}/>))}
                    <div className='h-[160px]'></div>
                </div>
                <div className='relative'>
                    <div className='fixed bottom-0 left-0 right-0 h-[132px]'>
                        <div className='mx-auto max-w-2xl h-full border-t shadow-xl rounded-t-xl bg-white' style={{ marginLeft: '33%' }}>
                            <div className='px-4 py-4'>
                                <form onSubmit={handleSubmit}>
                                    <div className='relative flex flex-row pr-20 border rounded-md'>
                                        <Textarea
                                            // ref={inputRef}
                                            tabIndex={0}
                                            // onKeyDown={onKeyDown}
                                            placeholder='Type a message..'
                                            className='min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm'
                                            autoFocus
                                            spellCheck={false}
                                            autoComplete='off'
                                            autoCorrect='off'
                                            name='message'
                                            rows={1}
                                            value={input}
                                            onChange={handleInputChange}
                                        />
                                        <div className='absolute right-0 top-3 sm:right-4'>
                                            <button
                                                type='submit'
                                                className='px-2 py-2 basis-1/12 bg-blue-500 rounded-xl w-12 hover:opacity-90 shadow-2xl disabled:pointer-events-none  disabled:bg-blue-200'
                                                disabled={input.trim() === ''}
                                            >
                                                <PaperPlaneIcon className='w-6 h-6 mx-auto text-white'/>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
