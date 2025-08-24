'use server';

import { signIn } from "@/lib/auth";
export async function authenticate(
  previousState: any,
  formData: FormData,
) {
   try {
    const credentials = Object.fromEntries(formData.entries());
    await signIn('credentials', {...credentials, redirectTo: '/' + formData.get("locale") + '/dashboard'});
  } catch (error: any) {
    // do not remove this, it's neccessary for redirect to work
    if (error.digest?.startsWith('NEXT_REDIRECT')) {
      throw error;
    }
    if (error.cause?.err?.message) {
      return { message: error.cause.err.message };
    }
    if (error.type == 'CredentialsSignin') {
      return { message: 'Invalid credentials.' };
    } else {
      return { message: 'Something went wrong.' };
    }
  }
}