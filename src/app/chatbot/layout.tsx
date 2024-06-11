import { userUserInfo } from '@/lib/hooks/use-user-profile';
import History from '@/app/ui/history';
import { getConversationList } from '../actions';

export default async function ChatLayout({ children }: { children: React.ReactNode }) {
    const { user } = await userUserInfo();
    const history = await getConversationList(user);
    return (
        <div className='flex flex-row h-full'>
            <History conversations={history.conversations} />
            {children}
        </div>
    );
}
