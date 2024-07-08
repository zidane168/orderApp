import { useSession } from 'next-auth/react';

function useSessionData() {
  const { data: session } = useSession();
  return session
}

export { useSessionData };