import { getConversationList } from '@/app/actions';
import History from '@/app/ui/history';
import Conversation from '@/app/ui/conversation';
import { userUserInfo } from '@/lib/hooks/use-user-profile';

export default async function Page() {
    const { user } = await userUserInfo();
    const history = await getConversationList(user);

    return (
        <div className='flex flex-row h-full'>
            <History conversationList={history.conversations}/>
            <Conversation user={user} content={[]} />
        </div>
    );
}
