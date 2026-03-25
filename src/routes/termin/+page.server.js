import { supabase } from '$lib/supabaseClient.js';

export const load = async () => {
  try {
    const { data } = await supabase.from('settings').select('status').eq('id', 'shop').single();
    return {
      settingsStatus: data ? data.status : 'Geöffnet (Regulär)'
    };
  } catch (e) {
    console.error("Error fetching settings:", e);
    return { settingsStatus: 'Geöffnet (Regulär)' };
  }
};

export const actions = {
  book: async ({ request }) => {
    const data = await request.formData();
    
    try {
      // Security check: Verify shop is open before accepting bookings
      const { data: settings } = await supabase.from('settings').select('status').eq('id', 'shop').single();
      if (settings && settings.status === 'Urlaubsmodus (Keine neuen Termine)') {
        return { success: false, error: "Die Werkstatt befindet sich aktuell im Urlaub. Es können vorübergehend keine neuen Termine angenommen werden." };
      }

      // Generate a short 6-character alphanumeric ID
      const generateId = () => Math.random().toString(36).substring(2, 8).toUpperCase();
      const newId = generateId();

      const newBooking = {
        id: newId,
        name: data.get('name')?.toString().trim() || 'Unbekannt',
        phone: data.get('phone')?.toString().trim() || 'Keine Angabe',
        bikeType: data.get('bikeType')?.toString().trim() || 'Sonstiges',
        problem: data.get('problem')?.toString().trim() || 'Keine Angabe',
        status: 'Neu',
        createdAt: new Date().toISOString(),
        messages: []
      };

      const { error } = await supabase.from('bookings').insert(newBooking);
      
      if (error) throw error;

      return { success: true, trackingId: newId };
    } catch (error) {
      console.error("Failed to save booking:", error);
      return { success: false, error: "Fehler beim Speichern der Anfrage. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns telefonisch." };
    }
  }
};
