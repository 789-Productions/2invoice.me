
'use server';

import { signOut } from '@/lib/auth'; // Adjust path to your auth.ts file

// This action can be passed directly to a form.
export async function signOutAction() {
  await signOut({ redirectTo: '/en/auth/signin' });
}