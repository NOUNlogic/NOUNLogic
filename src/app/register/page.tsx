import React from 'react';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Register | NounLogic',
  description: 'Create a new account',
};

export default function RegisterPage() {
  redirect('/');
}