import * as Avatar from '@radix-ui/react-avatar';
import { Message } from 'ai/react';
import clsx from 'clsx';
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { MemoizedReactMarkdown } from './markdown';
import Link from 'next/link';
import { useState } from 'react';

export default function ChatMessage( {message} : {message: Message}) {
    const [url, setUrl] = useState<URL>();
    const avatar = message.role === 'user' ? '' : 'https://github.com/shadcn.png';
    return (
        <div 
            className={clsx(
                'flex items-start p-2 max-w-full',
                {
                    'flex-row-reverse': message.role === 'user'
                }
            )}
        >
            <Avatar.Root className='h-8 w-8 my-1 select-none items-center justify-center overflow-hidden rounded-full align-middle'>
                <Avatar.Image className='h-full w-full rounded-[inherit] object-cover' src={avatar} />
                <Avatar.Fallback 
                    className='text-white leading-1 flex h-full w-full items-center justify-center bg-blue-300 text-[15px] font-medium'
                    delayMs={600}
                >
                   {message.role === 'user' ? 'M' : 'AI'}
                </Avatar.Fallback>
            </Avatar.Root>
            <div className={
                clsx(
                    'rounded-xl antialiased text-sm mx-4 px-4 py-3 max-w-[75%]',
                    {
                        'bg-gray-100': message.role !== 'user',
                        'text-black': message.role !== 'user',
                        'bg-blue-500': message.role === 'user',
                        'text-white': message.role === 'user',
                    }
                )
            }>
                <MemoizedReactMarkdown 
                    className='prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0'
                    remarkPlugins={[remarkGfm, remarkMath]}
                    components={{
                        a({children}) {
                            const urlValue = children?.toString();
                            if(urlValue?.startsWith('http') || urlValue?.startsWith('www')){
                                setUrl(new URL(urlValue));
                            }
                            return <Link href={url || '#'} target='_blank' className='text-blue-600 hover:underline active:text-blue-700 visited:text-blue-800'>
                                        {children}
                                    </Link>
                        }
                    }}
                >
                    {message.content}
                </MemoizedReactMarkdown>
            </div>
        </div>
    );
}
