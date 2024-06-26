import { useState } from 'react';
import Link from 'next/link';
import { ChatRequestOptions } from 'ai';
import { Message } from 'ai/react';
import clsx from 'clsx';
import * as Avatar from '@radix-ui/react-avatar';
import { CopyIcon, UpdateIcon } from '@radix-ui/react-icons';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { MemoizedReactMarkdown } from './markdown';
import { CodeBlock } from './codeblock';
import { User } from '@/lib/hooks/use-user-profile';

export default function ChatMessage( 
        {message, user, isLoading, reload} : 
        {message: Message, user: User, isLoading?: boolean, reload?: (chatRequestOptions?: ChatRequestOptions) => Promise<string | null | undefined>}
    ) {
    const [url, setUrl] = useState<URL>();
    const isUser: boolean = message.role === 'user';
    const avatar = isUser ? user.imageUrl : 'https://github.com/shadcn.png';

    const handleCopyToClipboard = async () => {
        try {
          await navigator.clipboard.writeText(message.content);
        } catch (error) {
          console.error('Failed to copy text to clipboard:', error);
        }
    };

    return (
        <div>
            <div 
                className={clsx(
                    'flex items-start p-2 max-w-full',
                    {
                        'flex-row-reverse': isUser
                    }
                )}
            >
                <Avatar.Root className='h-8 w-8 my-1 select-none items-center justify-center overflow-hidden rounded-full align-middle'>
                    <Avatar.Image className='h-full w-full rounded-[inherit] object-cover' src={avatar} />
                    <Avatar.Fallback 
                        className='text-white leading-1 flex h-full w-full items-center justify-center bg-blue-300 text-[15px] font-medium'
                        delayMs={600}
                    >
                    {isUser ? 'M' : 'AI'}
                    </Avatar.Fallback>
                </Avatar.Root>
                <div className={
                    clsx(
                        'rounded-xl antialiased text-sm mx-4 px-4 py-3 max-w-[75%]',
                        {
                            'bg-gray-100': !isUser,
                            'text-black': !isUser,
                            'bg-blue-500': isUser,
                            'text-white': isUser,
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
                            },
                            code({ node, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '');
                                if (match) {
                                    return (
                                        <CodeBlock
                                          key={Math.random()}
                                          language={(match && match[1]) || ''}
                                          value={String(children).replace(/\n$/, '')}
                                          {...props}
                                        />
                                    );
                                }
                                return (<code className={clsx('bg-red-200 text-red-900 rounded-md border-2 border-red-700 px-1' ,className)} {...props}>{children}</code>);
                            },
                        }}
                    >
                        {message.content}
                    </MemoizedReactMarkdown>
                </div>
            </div>
            {
                !isUser && !isLoading ?
                    <div className='flex flex-row space-x-3'>
                        <div className='ml-16 w-6 h-6 p-1 hover:bg-gray-100 rounded'>
                            <button className='bg-transparent'>
                                <CopyIcon onClick={handleCopyToClipboard} className='w-4 h-4 mx-auto text-gray-500'/>
                            </button>
                        </div>
                        {
                            reload ? 
                            <div className='w-6 h-6 p-1 hover:bg-gray-100 rounded'>
                                <button className='bg-transparent'>
                                    <UpdateIcon onClick={(e) => {reload && reload()}} className='w-4 h-4 text-gray-500'/>
                                </button>
                            </div> : ''
                        }
                    </div>  : ''
            }
        </div>
    );
}
