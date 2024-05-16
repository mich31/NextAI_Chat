'use client';

import { PaperPlaneIcon } from '@radix-ui/react-icons';
import Message from '../ui/message';
import { redirect } from 'next/navigation';

type MessageContent = {
    id: number,
    content: string,
    role: 'ai' | 'user',
};

export default function Page(){
    const messages: MessageContent[] = [
        {id: 1, content: 'Hi', role: 'user'},
        {id: 2, content: 'Hi, how can I help you ?', role: 'ai'},
        {id: 3, content: 'What are the benefits of fine tuning a llm model ?', role: 'user'},
        {
            id: 4, 
            content: 'Fine-tuning a large language model (LLM) can offer several benefits: Task-Specific Performance Improvement, Customization, Resource Efficiency, Faster Deployment, Transfer Learning, Domain Adaptation',
            role: 'ai'
        },
        {id: 5, content: 'Ok', role: 'user'},
        {id: 6, content: 'Can I help you with something else ?', role: 'ai'},
        {id: 7, content: 'I have a very long message to send. This is very long so I need to adapt this component.', role: 'user'},
        {id: 8, content: 'Fine! Can you provide me more details about this message ?', role: 'ai'},
        {id: 9, content: 'I would like to write an essay about the impact of generative AI on education', role: 'user'},
        {id: 10, content: 'Great! That\'s a really interesting topic. I would be glad to help you on this but I need a few more details', role: 'ai'},
        {id: 11, content: 'Ok, what do you need to know ?', role: 'user'},
    ]
    return (
        <div className='flex flex-row'>
            <div className='max-h-screen basis-1/4 bg-blue-300 p-2'>Conversations</div>
            <div className='flex max-h-screen basis-3/4 overflow-hidden flex-col bg-white'>
                <div className='mx-auto overflow-y-auto w-10/12 h-[90%] bg-white px-2 py-2 rounded-xl mt-8 shadow-2xl'>
                    {messages.map((m) => (<Message key={m.id} content={m.content} role={m.role}/>))}
                </div>
                <form 
                    action={(e) => {
                        const msg = e.get('message')?.toString();
                        console.log(msg);
                        if(msg) {
                            messages.push({id: messages.length, content: msg, role: 'user'});
                        }
                        redirect('/chatbot');
                    }} 
                    className='flex mx-auto w-10/12 py-4 space-x-4'
                >
                    <input 
                        type='text'
                        name='message'
                        className='basis-11/12 rounded-lg border-2 border-blue-300 px-2 py-2 focus:border-blue-900'
                        placeholder='Type message..' 
                    />
                    <button 
                        className='px-2 py-2 basis-1/12 bg-blue-300 rounded-xl w-64 hover:opacity-80'
                    >
                        <PaperPlaneIcon className='w-6 h-6 mx-auto text-white'/>
                    </button>
                </form>
            </div>
        </div>
    );
}
