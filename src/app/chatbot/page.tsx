import { getConversationList } from '@/app/actions';
import Conversation from '@/app/ui/conversation';
import { userUserInfo } from '@/lib/hooks/use-user-profile';

export default async function Page() {
    const { user } = await userUserInfo();
    const history = await getConversationList(user);
    const conversationList = history.conversations.map(c => {
        return {...c, active: false};
    });
    
    return (
        <>
            <Conversation user={user} conversationList={conversationList}/>
        </>
    );
}
