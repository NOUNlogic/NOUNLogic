import React from 'react';
import IntegrationsClient from './IntegrationsClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Integrations | NounLogic',
  description: 'Connect your institution to NounLogic or apply for a new integration.',
};

export default function IntegrationsPage() {
  return <IntegrationsClient />;
}