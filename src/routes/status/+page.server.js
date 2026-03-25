import { promises as fs } from 'fs';
import path from 'path';

const DB_FILE = path.resolve('./bookings.json');

export const actions = {
  search: async ({ request }) => {
    const data = await request.formData();
    let queryId = data.get('ticketId');
    
    if (!queryId) return { error: 'Bitte geben Sie eine Ticket-ID ein.' };
    
    // Normalize string (uppercase, remove spaces)
    queryId = queryId.toString().toUpperCase().trim();

    try {
      const fileData = await fs.readFile(DB_FILE, 'utf-8');
      const bookings = JSON.parse(fileData);
      
      const booking = bookings.find(b => b.id === queryId);
      
      if (!booking) {
        return { error: 'Kein Auftrag unter dieser Ticket-ID gefunden. Bitte prüfen Sie Ihre Eingabe.' };
      }

      // Return only safe data to the public frontend
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
      const fileData = await fs.readFile(DB_FILE, 'utf-8');
      const bookings = JSON.parse(fileData);
      const bookingIndex = bookings.findIndex(b => b.id === id.toString());
      
      if (bookingIndex === -1) {
        return { error: 'Ticket nicht gefunden.' };
      }

      if (!bookings[bookingIndex].messages) {
        bookings[bookingIndex].messages = [];
      }

      bookings[bookingIndex].messages.push({
        sender: 'Kunde',
        text: message.toString().trim(),
        timestamp: new Date().toISOString()
      });

      await fs.writeFile(DB_FILE, JSON.stringify(bookings, null, 2));

      return { 
        success: true, 
        messageSent: true,
        ticketInfo: {
          id: bookings[bookingIndex].id,
          bikeType: bookings[bookingIndex].bikeType,
          status: bookings[bookingIndex].status,
          date: bookings[bookingIndex].createdAt,
          messages: bookings[bookingIndex].messages
        }
      };

    } catch (error) {
      console.error("Failed to send message:", error);
      return { error: 'Fehler beim Senden der Nachricht.' };
    }
  }
};
