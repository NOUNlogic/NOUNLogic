import React from 'react';
import Web3Client from './Web3Client';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Web3 | NounLogic',
  description: 'Manage your blockchain credentials and wallet',
};

export default function Web3Page() {
  return <Web3Client />;
}