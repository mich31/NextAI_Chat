import Conversation from '@/app/ui/conversation';
import { userUserInfo } from '@/lib/hooks/use-user-profile';

export default async function Page() {
    const { user } = await userUserInfo();

    return (<Conversation user={user} content={[]} />);
}
