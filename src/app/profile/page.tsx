import React from 'react';
import ProfileClient from './ProfileClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Profile | NounLogic',
  description: 'View and edit your profile',
};

export default function ProfilePage() {
  return <ProfileClient />;
}