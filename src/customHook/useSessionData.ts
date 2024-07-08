import { getSession } from 'next-auth/react';

export const useSessionData = async () => {
    const session = await getSession()
    return session
} 