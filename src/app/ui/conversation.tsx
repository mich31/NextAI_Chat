'use client';

import { Textarea } from '@/app/ui/textarea';
import { PaperPlaneIcon, StopIcon } from '@radix-ui/react-icons';
import { Message, useChat } from 'ai/react';
import ChatMessage from '@/app/ui/message';
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit';
import { User } from '@/lib/hooks/use-user-profile';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useParams, useRouter } from 'next/navigation';

export default function Conversation({ user, content }: { user: User, content: Message[] }) {
    const { replace } = useRouter();
    const { messages, input, handleInputChange, handleSubmit, isLoading, stop, reload } = useChat({
        api: '../api/chat/v2',
        initialMessages: content,
        onFinish() {
            if(conversationId !== String(params.id || '')) {
                replace(`/chatbot/${conversationId}`);
            }
        }
    });
    const { formRef, onKeyDown } = useEnterSubmit();
    const params = useParams();
    const [conversationId, setConversationId] = useState<string>(String(params.id || ''));

    const handleInputSubmit = async (event: any) => {
        const isNewConversation = (conversationId === '');
        let currentConversationId = isNewConversation ? uuidv4() : conversationId; 
        const userInfo: Record<string, string> = {
            conversationId: currentConversationId,
            action: isNewConversation ? 'create' : 'update',
            userName: user?.userName || '',
            emailAddress: user?.emailAddress || '',
        };

        handleSubmit(event, { data: userInfo });

        if(isNewConversation) {
            setConversationId(currentConversationId);
        }
    }

    return (
        <div className='flex flex-col basis-[77%] overflow-y-auto bg-slate-50'>
            <div className='mx-auto w-10/12 pt-4 h-full'>
                {messages.map((m, i, msgs) => (
                        (i === msgs.length-1) ? 
                            <ChatMessage key={i} message={m} user={user} isLoading={isLoading} reload={reload}/> 
                            : <ChatMessage key={i} message={m} user={user} isLoading={isLoading}/> 
                    ))
                }
                <div className='h-[160px]'></div>
            </div>
            <div className='relative'>
                <div className='fixed bottom-0 left-0 right-0 h-[132px]'>
                    <div className='mx-auto max-w-2xl h-full border-t shadow-xl rounded-t-xl bg-white' style={{ marginLeft: '33%' }}>
                        <div className='px-4 py-4'>
                            <form ref={formRef} onSubmit={handleInputSubmit}>
                                <div className='relative flex flex-row pr-20 border rounded-md'>
                                    <Textarea
                                        tabIndex={0}
                                        onKeyDown={onKeyDown}
                                        placeholder='Type a message..'
                                        className='min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm disabled:cursor-not-allowed'
                                        autoFocus
                                        spellCheck={false}
                                        autoComplete='off'
                                        autoCorrect='off'
                                        name='message'
                                        rows={1}
                                        value={input}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                    />
                                    <div className='absolute right-0 top-3 sm:right-4'>
                                        <button
                                            type='submit'
                                            className='px-2 py-2 basis-1/12 bg-blue-500 rounded-xl w-12 hover:opacity-90 shadow-2xl disabled:cursor-not-allowed disabled:bg-blue-200'
                                            disabled={input.trim() === '' && !isLoading}
                                        >
                                            {
                                                isLoading ? 
                                                    <StopIcon onClick={stop} className='w-6 h-6 mx-auto text-white'/> : <PaperPlaneIcon className='w-6 h-6 mx-auto text-white'/>
                                            }
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
