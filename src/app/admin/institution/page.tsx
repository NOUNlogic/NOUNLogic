import InstitutionClient from './InstitutionClient';
import { AppwriteAuthProvider } from '@/lib/appwrite/auth-context';

export const dynamic = 'force-dynamic';

const InstitutionPage = () => {
  return (
    <AppwriteAuthProvider>
      <InstitutionClient />
    </AppwriteAuthProvider>
  );
};

export default InstitutionPage;
