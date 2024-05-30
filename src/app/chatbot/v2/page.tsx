import { getConversationList } from '@/app/actions';
import Conversation from '@/app/ui/conversation';
import { userUserInfo } from '@/lib/hooks/use-user-profile';

export default async function Page() {
    const { user } = await userUserInfo();
    const history = await getConversationList(user);
    
    return (
        <>
            <Conversation user={user} history={history}/>
        </>
    );
}
