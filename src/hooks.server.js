import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
  // Check if user is trying to access the admin area
  if (event.url.pathname.startsWith('/admin')) {
    const sessionCookie = event.cookies.get('adminSession');
    
    // If not logged in and not already on the login page, redirect to login
    if (sessionCookie !== 'admin' && sessionCookie !== 'dev' && sessionCookie !== 'viewer' && event.url.pathname !== '/admin/login') {
      throw redirect(303, '/admin/login');
    }
  }
  
  const response = await resolve(event);
  return response;
};
