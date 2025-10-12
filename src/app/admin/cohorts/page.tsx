import CohortsClient from './CohortsClient';
import { AppwriteAuthProvider } from '@/lib/appwrite/auth-context';

export const dynamic = 'force-dynamic';

const CohortsPage = () => {
  return (
    <AppwriteAuthProvider>
      {/* Ensure client-only by wrapping in a dynamic import or client boundary if needed */}
      <CohortsClient />
    </AppwriteAuthProvider>
  );
};

export default CohortsPage;
