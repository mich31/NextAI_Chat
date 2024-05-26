import { useUser } from '@clerk/nextjs';

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
