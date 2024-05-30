import { useUser } from '@clerk/nextjs';
import { auth, currentUser } from '@clerk/nextjs/server';

export type User = {
    id: string | undefined;
    userName: string | null | undefined;
    emailAddress: string | undefined;
    firstName: string | null | undefined;
    lastName: string | null | undefined;
    imageUrl: string | undefined;
}

export function useUserProfile(): {user: User} {
    const { user } = useUser();
    const profile = {
        id: user?.id,
        userName: user?.username,
        emailAddress: user?.primaryEmailAddress?.emailAddress,
        firstName: user?.firstName,
        lastName: user?.lastName,
        imageUrl: user?.imageUrl,
    };

    return { user: profile };
}

export async function userUserInfo(): Promise<{user: User}> {
    const user = await currentUser();
    const profile = {
        id: user?.id,
        userName: user?.username,
        emailAddress: user?.primaryEmailAddress?.emailAddress,
        firstName: user?.firstName,
        lastName: user?.lastName,
        imageUrl: user?.imageUrl,
    };

    return { user: profile };
}
