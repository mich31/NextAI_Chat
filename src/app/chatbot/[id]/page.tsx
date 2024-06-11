import { getConversation, getConversationList } from '@/app/actions';
import History from '@/app/ui/history';
import Conversation from '@/app/ui/conversation';
import { userUserInfo } from '@/lib/hooks/use-user-profile';
import { Message } from 'ai/react';

export default async function Page({ params }: { params: { id: string } }) {
    const { user } = await userUserInfo();
    const history = await getConversationList(user);
    const conversation = await getConversation(params.id, user);
    const content: Message[] = JSON.parse(conversation.content);

    return (
        <div className='flex flex-row h-full'>
            <History conversationList={history.conversations} conversationId={params.id}/>
            <Conversation user={user} content={content} />
        </div>
    );
}
