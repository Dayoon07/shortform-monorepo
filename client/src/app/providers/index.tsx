import { ReactNode } from 'react';
import { UserProvider } from '../../shared/context/UserContext';

interface ProvidersProps { children: ReactNode; }

export function Providers({ children }: ProvidersProps) { 
    return <UserProvider>{children}</UserProvider>
}