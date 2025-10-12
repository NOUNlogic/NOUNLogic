import AdminClient from './AdminClient';
import { AppwriteAuthProvider } from '@/lib/appwrite/auth-context';

export const dynamic = 'force-dynamic';

const AdminPage = () => {
  return (
    <AppwriteAuthProvider>
      <AdminClient />
    </AppwriteAuthProvider>
  );
};

export default AdminPage;
