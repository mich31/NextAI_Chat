import clsx from 'clsx';
import Link from 'next/link';

export default function History(
    { conversationList, conversationId }:
    { conversationList: Array<{id: string, title: string, updated_at: Date}>, conversationId?: string }
) {
    return (
        <div className='flex flex-col basis-[23%] bg-blue-100 p-4 space-y-4' style={{width: '18rem'}}>
            <a href='/chatbot' className='antialiased h-8 mx-6 py-1 hover:rounded-lg hover:bg-blue-200 text-center text-gray-800 text-sm font-medium'>
                New conversation
            </a>
            <div className='flex flex-col h-full space-y-1'>
                <div className='antialiased h-8 text-center text-gray-500 text-sm font-semibold'>History</div>
                {conversationList.map((c) => (
                    <Link
                        key={c.id}
                        href={`/chatbot/${c.id}`}
                        className={clsx(
                            'antialiased text-center text-gray-800 text-sm font-medium w-full h-10 px-2 py-2 truncate hover:rounded-lg hover:bg-blue-200',
                            (conversationId === c.id) ? 'rounded-lg bg-blue-200 ': ''
                        )}
                    >
                        {c.title}
                    </Link>
                ))}
            </div>
        </div>
    );
}
