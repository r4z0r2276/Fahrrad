import { promises as fs } from 'fs';
import path from 'path';

const DB_FILE = path.resolve('./bookings.json');

export const actions = {
  book: async ({ request }) => {
    const data = await request.formData();
    
    // Generate a short 6-character alphanumeric ID
    const generateId = () => Math.random().toString(36).substring(2, 8).toUpperCase();
    const newId = generateId();

    const newBooking = {
      id: newId,
      name: data.get('name'),
      phone: data.get('phone'),
      bikeType: data.get('bikeType'),
      problem: data.get('problem'),
      status: 'Neu',
      createdAt: new Date().toISOString(),
      messages: []
    };

    try {
      let bookings = [];
      try {
        const fileData = await fs.readFile(DB_FILE, 'utf-8');
        bookings = JSON.parse(fileData);
      } catch (e) {
        // File doesn't exist yet
      }

      bookings.push(newBooking);
      await fs.writeFile(DB_FILE, JSON.stringify(bookings, null, 2));

      return { success: true, trackingId: newBooking.id };
    } catch (error) {
      console.error("Failed to save booking:", error);
      return { success: false, error: "Fehler beim Speichern der Anfrage." };
    }
  }
};
