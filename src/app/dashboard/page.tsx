import React from 'react';
import DashboardClient from './DashboardClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Dashboard | NounLogic',
  description: 'View your social dashboard',
};

export default function DashboardPage() {
  return <DashboardClient />;
}