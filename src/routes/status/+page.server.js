import { supabase } from '$lib/supabaseClient.js';

export const actions = {
  search: async ({ request }) => {
    const data = await request.formData();
    let queryId = data.get('ticketId');
    
    if (!queryId) return { error: 'Bitte geben Sie eine Ticket-ID ein.' };
    
    // Normalize string (uppercase, remove spaces)
    queryId = queryId.toString().toUpperCase().trim();

    try {
      const { data: booking } = await supabase.from('bookings').select('id, "bikeType", status, "createdAt", messages').eq('id', queryId).single();
      
      if (!booking) {
        return { error: 'Kein Auftrag unter dieser Ticket-ID gefunden. Bitte prüfen Sie Ihre Eingabe.' };
      }

      return { 
        success: true, 
        ticketInfo: {
          id: booking.id,
          bikeType: booking.bikeType,
          status: booking.status,
          date: booking.createdAt,
          messages: booking.messages || []
        }
      };

    } catch (error) {
      console.error("Failed to query booking:", error);
      return { error: 'Fehler bei der Datenbank-Abfrage.' };
    }
  },

  sendMessage: async ({ request }) => {
    const data = await request.formData();
    const id = data.get('ticketId');
    const message = data.get('message');
    
    if (!id || !message || message.toString().trim() === '') {
      return { error: 'Bitte geben Sie eine Nachricht ein.' };
    }

    try {
      const { data: booking } = await supabase.from('bookings').select('id, "bikeType", status, "createdAt", messages').eq('id', id.toString()).single();
      
      if (!booking) {
        return { error: 'Ticket nicht gefunden.' };
      }

      let msgs = booking.messages || [];
      msgs.push({
        sender: 'Kunde',
        text: message.toString().trim(),
        timestamp: new Date().toISOString()
      });

      await supabase.from('bookings').update({ messages: msgs }).eq('id', booking.id);

      return { 
        success: true, 
        messageSent: true,
        ticketInfo: {
          id: booking.id,
          bikeType: booking.bikeType,
          status: booking.status,
          date: booking.createdAt,
          messages: msgs
        }
      };

    } catch (error) {
      console.error("Failed to send message:", error);
      return { error: 'Fehler beim Senden der Nachricht.' };
    }
  }
};
