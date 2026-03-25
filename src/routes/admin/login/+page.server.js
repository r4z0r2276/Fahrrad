import { fail, redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient.js';

export const actions = {
  login: async ({ request, cookies }) => {
    const data = await request.formData();
    const username = data.get('username');
    const password = data.get('password');

    // Hardcoded credentials for now
    if (username === 'Lars.K' && password === 'Schraubermeister2007') {
      cookies.set('adminSession', 'admin', {
        path: '/', httpOnly: true, sameSite: 'strict', maxAge: 60 * 60 * 24 
      });
      throw redirect(303, '/admin');
    }

    if (username === 'Niko.C' && password === 'DevLogin2006') {
      cookies.set('adminSession', 'dev', {
        path: '/', httpOnly: true, sameSite: 'strict', maxAge: 60 * 60 * 24 
      });
      throw redirect(303, '/admin');
    }

    // Dynamic viewer login
    try {
      if (username.toLowerCase() === 'gast') {
        const { data: sData } = await supabase.from('settings').select('*').eq('id', 'shop').single();
        if (sData && sData.viewer_password && password === sData.viewer_password) {
          cookies.set('adminSession', 'viewer', {
            path: '/', httpOnly: true, sameSite: 'strict', maxAge: 60 * 60 * 24 
          });
          throw redirect(303, '/admin');
        }
      }
    } catch(e) { console.error("Viewer login error:", e); }

    return fail(400, { error: 'Falscher Benutzername oder Passwort' });
  }
};
