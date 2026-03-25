import { promises as fs } from 'fs';
import path from 'path';
import { redirect } from '@sveltejs/kit';

const DB_FILE = path.resolve('./bookings.json');
const INV_FILE = path.resolve('./inventory.json');
const FIN_FILE = path.resolve('./finances.json');
const NOTES_FILE = path.resolve('./notes.json');

// Initialize dummy DB file if it doesn't exist
async function initDBs() {
  const initFile = async (file, defaultData) => {
    try { await fs.access(file); } 
    catch { await fs.writeFile(file, JSON.stringify(defaultData)); }
  };
  await initFile(DB_FILE, []);
  await initFile(INV_FILE, []); 
  await initFile(FIN_FILE, []); 
  await initFile(NOTES_FILE, []); 
}

export const load = async ({ cookies }) => {
  await initDBs();
  const role = cookies.get('adminSession');
  
  try {
    const bData = await fs.readFile(DB_FILE, 'utf-8');
    const iData = await fs.readFile(INV_FILE, 'utf-8');
    const fData = await fs.readFile(FIN_FILE, 'utf-8');
    const nData = await fs.readFile(NOTES_FILE, 'utf-8');
    
    const bookings = JSON.parse(bData);
    
    // Sort by newest first
    bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    return {
      bookings,
      inventory: JSON.parse(iData),
      finances: JSON.parse(fData),
      notes: JSON.parse(nData),
      role
    };
  } catch (e) {
    console.error("Error reading database:", e);
  }
};

export const actions = {
  replyMessage: async ({ request }) => {
    const data = await request.formData();
    const id = data.get('id');
    const message = data.get('message');

    if (!id || !message || message.toString().trim() === '') return;

    try {
      const fileData = await fs.readFile(DB_FILE, 'utf-8');
      const bookings = JSON.parse(fileData);
      
      const index = bookings.findIndex(b => b.id === id);
      if (index !== -1) {
        if (!bookings[index].messages) bookings[index].messages = [];
        bookings[index].messages.push({
          sender: 'Werkstatt',
          text: message.toString().trim(),
          timestamp: new Date().toISOString()
        });
        await fs.writeFile(DB_FILE, JSON.stringify(bookings, null, 2));
      }
    } catch (e) {
      console.error("Error replying to message:", e);
    }
  },

  saveNote: async ({ request }) => {
    const data = await request.formData();
    const text = data.get('text');
    if (text !== null) {
      await fs.writeFile(NOTES_FILE, JSON.stringify([{ text: text.toString() }]));
    }
  },

  checkoutBooking: async ({ request }) => {
    const data = await request.formData();
    const id = data.get('id');
    const desc = data.get('desc');
    const amount = data.get('amount');
    const method = data.get('method');
    
    if (!id || !desc || !amount) return;
    
    try {
      // 1. Mark booking as abgeholt
      const bFile = await fs.readFile(DB_FILE, 'utf-8');
      const bookings = JSON.parse(bFile);
      const bIndex = bookings.findIndex(x => x.id === id);
      if (bIndex !== -1) {
        bookings[bIndex].status = 'Fahrrad abgeholt';
        await fs.writeFile(DB_FILE, JSON.stringify(bookings, null, 2));
      }

      // 2. Add to Finances
      const fFile = await fs.readFile(FIN_FILE, 'utf-8');
      const finances = JSON.parse(fFile);
      finances.push({
        id: Date.now().toString(),
        date: new Date().toISOString(),
        desc: `${desc.toString().trim()} (${method})`,
        amount: parseFloat(amount.toString())
      });
      await fs.writeFile(FIN_FILE, JSON.stringify(finances, null, 2));
    } catch(e) { console.error(e); }
  },


  createOfflineBooking: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name');
    const phone = data.get('phone');
    const bikeType = data.get('bikeType');
    
    if (!name || !bikeType) return;

    try {
      const fileData = await fs.readFile(DB_FILE, 'utf-8');
      const bookings = JSON.parse(fileData);
      
      const randomString = () => Math.random().toString(36).substring(2, 8).toUpperCase();
      
      bookings.push({
        id: randomString(),
        name: name.toString().trim(),
        phone: phone ? phone.toString().trim() : 'Keine Angabe',
        bikeType: bikeType.toString().trim(),
        problem: 'Offline im Laden abgegeben.',
        status: 'Neu',
        createdAt: new Date().toISOString(),
        messages: [{ sender: 'System', text: 'Offline-Ticket manuell in der Filiale generiert.', timestamp: new Date().toISOString() }]
      });
      
      await fs.writeFile(DB_FILE, JSON.stringify(bookings, null, 2));
    } catch (e) { console.error(e); }
  },

  addInventory: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name');
    const min = data.get('min');
    const price = data.get('price');
    
    if (!name || !min || !price) return;
    
    try {
      const fileData = await fs.readFile(INV_FILE, 'utf-8');
      const inventory = JSON.parse(fileData);
      inventory.push({
        id: Date.now().toString(),
        name: name.toString().trim(),
        count: 0,
        min: parseInt(min.toString()),
        price: parseFloat(price.toString())
      });
      await fs.writeFile(INV_FILE, JSON.stringify(inventory, null, 2));
    } catch(e) { console.error(e); }
  },

  updateInventoryCount: async ({ request }) => {
    const data = await request.formData();
    const id = data.get('id');
    const change = parseInt(data.get('change')?.toString() || '0');
    
    try {
      const fileData = await fs.readFile(INV_FILE, 'utf-8');
      const inventory = JSON.parse(fileData);
      const index = inventory.findIndex(i => i.id === id);
      if (index !== -1) {
        inventory[index].count += change;
        if (inventory[index].count < 0) inventory[index].count = 0;
        await fs.writeFile(INV_FILE, JSON.stringify(inventory, null, 2));
      }
    } catch(e) { console.error(e); }
  },

  addFinance: async ({ request }) => {
    const data = await request.formData();
    const desc = data.get('desc');
    const amount = data.get('amount');
    
    if (!desc || !amount) return;
    
    try {
      const fileData = await fs.readFile(FIN_FILE, 'utf-8');
      const finances = JSON.parse(fileData);
      finances.push({
        id: Date.now().toString(),
        date: new Date().toISOString(),
        desc: desc.toString().trim(),
        amount: parseFloat(amount.toString())
      });
      await fs.writeFile(FIN_FILE, JSON.stringify(finances, null, 2));
    } catch(e) { console.error(e); }
  },

  generateDemoBooking: async ({ cookies }) => {
    if (cookies.get('adminSession') !== 'dev') return;

    try {
      const fileData = await fs.readFile(DB_FILE, 'utf-8');
      const bookings = JSON.parse(fileData);
      
      const randomString = () => Math.random().toString(36).substring(2, 8).toUpperCase();
      const demoNames = ['Max Mustermann', 'Julia Weber', 'Thomas Schmidt', 'Sarah Lehmann'];
      const demoBikes = ['Mountainbike', 'Citybike', 'E-Bike', 'Rennrad'];
      const demoProblems = ['Platter Reifen', 'Kette quietscht', 'Bremsen kaputt', 'Große Inspektion', 'Schaltung einstellen'];
      
      bookings.push({
        id: randomString(),
        name: demoNames[Math.floor(Math.random() * demoNames.length)],
        phone: '0151-' + Math.floor(Math.random() * 9000000 + 1000000),
        bikeType: demoBikes[Math.floor(Math.random() * demoBikes.length)],
        problem: demoProblems[Math.floor(Math.random() * demoProblems.length)],
        status: 'Neu',
        createdAt: new Date().toISOString(),
        messages: []
      });
      
      await fs.writeFile(DB_FILE, JSON.stringify(bookings, null, 2));
    } catch (e) {
      console.error("Error generating demo booking:", e);
    }
  },

  updateStatus: async ({ request }) => {
    const data = await request.formData();
    const id = data.get('id');
    const newStatus = data.get('status');

    if (!id || !newStatus) return;

    try {
      const fileData = await fs.readFile(DB_FILE, 'utf-8');
      const bookings = JSON.parse(fileData);
      
      const index = bookings.findIndex(b => b.id === id);
      if (index !== -1) {
        bookings[index].status = newStatus;
        await fs.writeFile(DB_FILE, JSON.stringify(bookings, null, 2));
      }
    } catch (e) {
      console.error("Error updating status:", e);
    }
  },

  deleteBooking: async ({ request, cookies }) => {
    // Only developers are allowed to delete bookings
    if (cookies.get('adminSession') !== 'dev') return;

    const data = await request.formData();
    const id = data.get('id');

    if (!id) return;

    try {
      const fileData = await fs.readFile(DB_FILE, 'utf-8');
      let bookings = JSON.parse(fileData);
      
      bookings = bookings.filter(b => b.id !== id);
      await fs.writeFile(DB_FILE, JSON.stringify(bookings, null, 2));
    } catch (e) {
      console.error("Error deleting booking:", e);
    }
  },

  clearAll: async ({ cookies }) => {
    if (cookies.get('adminSession') === 'dev') {
      await fs.writeFile(DB_FILE, JSON.stringify([]));
      await fs.writeFile(INV_FILE, JSON.stringify([]));
      await fs.writeFile(FIN_FILE, JSON.stringify([]));
      await fs.writeFile(NOTES_FILE, JSON.stringify([]));
    }
  },

  logout: async ({ cookies }) => {
    cookies.delete('adminSession', { path: '/' });
    throw redirect(303, '/admin/login');
  }
};
