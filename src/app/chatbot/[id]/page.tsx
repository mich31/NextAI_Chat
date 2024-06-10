import { getConversation } from '@/app/actions';
import Conversation from '@/app/ui/conversation';
import { userUserInfo } from '@/lib/hooks/use-user-profile';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
    const { user } = await userUserInfo();
    const conversation = await getConversation(params.id, user);
    if(!conversation) {
        notFound();
    }
    const content = JSON.parse(conversation.content);
    return (
        <Conversation user={user} content={content} />
    );
}