import clsx from 'clsx';
import Link from 'next/link';

export default function History(
    { conversationList, conversationId }:
    { conversationList: Array<{id: string, title: string, updated_at: Date}>, conversationId?: string }
) {
    return (
        <div className='flex flex-col basis-[23%] bg-blue-100 p-4 space-y-4' style={{width: '18rem'}}>
            <div className='antialiased text-center text-sm font-medium'>
                <a href='/chatbot' className='w-full h-10 hover:rounded-lg hover:bg-blue-200'>New conversation</a>
            </div>
            <div className='h-full space-y-2'>
                <div className='antialiased text-center text-gray-500 text-sm font-bold'>History</div>
                {conversationList.map((c) => (
                    <div key={c.id} className='antialiased text-center text-gray-700 text-sm font-medium'>
                        <Link
                            key={c.id}
                            href={`/chatbot/${c.id}`}
                            className={clsx(
                                'w-full h-10 p-1 truncate hover:rounded-lg hover:bg-blue-200',
                                (conversationId === c.id) ? 'rounded-lg bg-blue-200 ': ''
                            )}
                        >
                            {c.title}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
