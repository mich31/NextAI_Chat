import * as Avatar from '@radix-ui/react-avatar';
import clsx from 'clsx';
export default function Message( {content, role} : {content: string, role: 'user' | 'ai'}) {
    const avatar = role === 'ai' ? 'https://github.com/shadcn.png' : ''
    return (
        <div 
            className={clsx(
                'flex items-start p-2 max-w-full',
                {
                    'flex-row-reverse': role === 'user'
                }
            )}
        >
            <Avatar.Root className='h-12 w-12 select-none items-center justify-center overflow-hidden rounded-full align-middle'>
                <Avatar.Image className='h-full w-full rounded-[inherit] object-cover' src={avatar} />
                <Avatar.Fallback 
                    className='text-white leading-1 flex h-full w-full items-center justify-center bg-blue-300 text-[15px] font-medium'
                    delayMs={600}
                >
                   {role === 'ai' ? 'AI' : 'M'}
                </Avatar.Fallback>
            </Avatar.Root>
            <div className={
                clsx(
                    'rounded-full mx-4 px-6 py-3 max-w-[75%]',
                    {
                        'bg-gray-100': role === 'ai',
                        'text-black': role === 'ai',
                        'bg-blue-500': role === 'user',
                        'text-white': role === 'user',
                    }
                )
            }>
                {content}
            </div>
        </div>
    );
}
