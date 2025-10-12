import StudioClient from './StudioClient';
import { AppwriteAuthProvider } from '@/lib/appwrite/auth-context';

export const dynamic = 'force-dynamic';

const StudioPage = () => {
  return (
    <AppwriteAuthProvider>
      <StudioClient />
    </AppwriteAuthProvider>
  );
};

export default StudioPage;
