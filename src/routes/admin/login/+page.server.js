import { fail, redirect } from '@sveltejs/kit';

export const actions = {
  login: async ({ request, cookies }) => {
    const data = await request.formData();
    const username = data.get('username');
    const password = data.get('password');

    // Hardcoded credentials for now (in production this goes into .env)
    if (username === 'admin' && password === 'fahrrad2026') {
      cookies.set('adminSession', 'admin', {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 
      });
      throw redirect(303, '/admin');
    }

    if (username === 'dev' && password === 'dev2026') {
      cookies.set('adminSession', 'dev', {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 
      });
      throw redirect(303, '/admin');
    }

    // Return an error if authentication fails
    return fail(400, { error: 'Falscher Benutzername oder Passwort' });
  }
};
