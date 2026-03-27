import { supabase } from '$lib/supabaseClient.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
  const role = cookies.get('adminSession');
  
  if (!role) {
    throw redirect(303, '/admin/login');
  }
  
  try {
    const { data: bData } = await supabase.from('bookings').select('*').order('createdAt', { ascending: false });
    const { data: iData } = await supabase.from('inventory').select('*');
    const { data: fData, error: fError } = await supabase.from('finances').select('*').order('date', { ascending: true });
    if (fError) console.error("Finances fetch error:", fError);
    if (fData && fData.length > 0) {
      const keys = Object.keys(fData[0]);
      console.log("SCHEMA CHECK: finances columns found:", keys);
      if (!keys.includes('revenue') || !keys.includes('material_costs')) {
        console.warn("WARNING: revenue or material_costs column missing in finances table!");
      }
    }
    const { data: nData } = await supabase.from('notes').select('*').order('id', { ascending: false }).limit(50);
    const { data: sData } = await supabase.from('settings').select('*').eq('id', 'shop').single();
    
    return {
      bookings: bData || [],
      inventory: iData || [],
      finances: fData || [],
      notes: nData || [],
      settings: sData || { status: 'Geöffnet (Regulär)' },
      role
    };
  } catch (e) {
    console.error("Error reading database:", e);
    return { bookings: [], inventory: [], finances: [], notes: [], settings: { status: 'Geöffnet (Regulär)' }, role };
  }
};

export const actions = {
  replyMessage: async ({ request, cookies }) => {
    if (cookies?.get('adminSession') === 'viewer') return;
    const data = await request.formData();
    const id = data.get('id');
    const message = data.get('message');

    if (!id || !message || message.toString().trim() === '') return;

    try {
      const { data: booking } = await supabase.from('bookings').select('messages').eq('id', id).single();
      if (booking) {
        let msgs = booking.messages || [];
        msgs.push({
          sender: 'Werkstatt',
          text: message.toString().trim(),
          timestamp: new Date().toISOString()
        });
        await supabase.from('bookings').update({ messages: msgs }).eq('id', id);
      }
    } catch (e) {
      console.error("Error replying to message:", e);
    }
  },

  saveNote: async ({ request, cookies }) => {
    if (cookies?.get('adminSession') === 'viewer') return;
    const data = await request.formData();
    const text = data.get('text');
    if (text !== null) {
      await supabase.from('notes').insert({ text: text.toString() });
    }
  },

  deleteNote: async ({ request, cookies }) => {
    if (cookies?.get('adminSession') === 'viewer') return;
    const data = await request.formData();
    const id = data.get('id');
    if (id) {
      await supabase.from('notes').delete().eq('id', id);
    }
  },

  checkoutBooking: async ({ request, cookies }) => {
    if (cookies?.get('adminSession') === 'viewer') return;
    const data = await request.formData();
    const id = data.get('id');
    const desc = data.get('desc');
    const amount = data.get('amount');
    const method = data.get('method');
    
    if (!id || !desc || !amount) return;
    
    try {
      // 1. Mark booking as abgeholt
      await supabase.from('bookings').update({ status: 'Fahrrad abgeholt' }).eq('id', id);

      // 2. Add to Finances
      await supabase.from('finances').insert({
        id: Date.now().toString(),
        date: new Date().toISOString(),
        desc: `${desc.toString().trim()} (${method})`,
        amount: parseFloat(amount.toString())
      });
    } catch(e) { console.error(e); }
  },

  createOfflineBooking: async ({ request, cookies }) => {
    if (cookies?.get('adminSession') === 'viewer') return;
    const data = await request.formData();
    const name = data.get('name');
    const phone = data.get('phone');
    const bikeType = data.get('bikeType');
    const problem = data.get('problem') || 'Offline im Laden abgegeben.';
    
    if (!name || !bikeType) return;

    try {
      const randomString = () => Math.random().toString(36).substring(2, 8).toUpperCase();
      
      await supabase.from('bookings').insert({
        id: randomString(),
        name: name.toString().trim(),
        phone: phone ? phone.toString().trim() : 'Keine Angabe',
        bikeType: bikeType.toString().trim(),
        problem: problem.toString().trim(),
        status: 'Neu',
        createdAt: new Date().toISOString(),
        messages: [{ sender: 'System', text: 'Offline-Ticket manuell in der Filiale generiert.', timestamp: new Date().toISOString() }]
      });
    } catch (e) { console.error(e); }
  },

  addInventory: async ({ request, cookies }) => {
    if (cookies?.get('adminSession') === 'viewer') return;
    const data = await request.formData();
    const name = data.get('name');
    const min = data.get('min');
    const price = data.get('price');
    
    if (!name || !min || !price) return;
    
    try {
      await supabase.from('inventory').insert({
        id: Date.now().toString(),
        name: name.toString().trim(),
        count: 0,
        min: parseInt(min.toString()),
        price: parseFloat(price.toString())
      });
    } catch(e) { console.error(e); }
  },

  updateInventoryCount: async ({ request, cookies }) => {
    if (cookies?.get('adminSession') === 'viewer') return;
    const data = await request.formData();
    const id = data.get('id');
    const change = parseInt(data.get('change')?.toString() || '0');
    
    try {
      const { data: item } = await supabase.from('inventory').select('count').eq('id', id).single();
      if (item) {
        let newCount = item.count + change;
        if (newCount < 0) newCount = 0;
        await supabase.from('inventory').update({ count: newCount }).eq('id', id);
      }
    } catch(e) { console.error(e); }
  },

  addFinance: async ({ request, cookies }) => {
    if (cookies?.get('adminSession') === 'viewer') return;
    const data = await request.formData();
    const desc = data.get('desc');
    const parseNum = (val) => parseFloat(val?.toString().replace(',', '.') || '0');
    const revenue = parseNum(data.get('revenue'));
    const material_costs = parseNum(data.get('material_costs'));
    if (!desc) return;
    const entry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      desc: desc.toString().trim(),
      amount: revenue
    };
    console.log("INSERTING FINANCE:", { ...entry, revenue, material_costs });
    let { error } = await supabase.from('finances').insert({ ...entry, revenue, material_costs });
    if (error) {
      console.error("SUPABASE INSERT ERROR (with new columns):", error);
      console.log("FALLING BACK TO OLD INSERT (amount only)");
      await supabase.from('finances').insert(entry);
    } else {
      console.log("SUPABASE INSERT SUCCESS (with new columns)");
    }
  },


  deleteFinance: async ({ request, cookies }) => {
    if (cookies?.get('adminSession') === 'viewer') return;
    const data = await request.formData();
    const id = data.get('id');
    if (!id) return;
    try {
      await supabase.from('finances').delete().eq('id', id.toString());
    } catch(e) { console.error(e); }
  },

  updateFinance: async ({ request, cookies }) => {
    if (cookies?.get('adminSession') === 'viewer') return;
    const data = await request.formData();
    const id = data.get('id');
    const desc = data.get('desc');
    const parseNum = (val) => parseFloat(val?.toString().replace(',', '.') || '0');
    const revenue = parseNum(data.get('revenue'));
    const material_costs = parseNum(data.get('material_costs'));
    if (!id || !desc) return;
    
    const entry = {
      desc: desc.toString().trim(),
      amount: revenue
    };
    try {
      console.log("UPDATING FINANCE:", { ...entry, revenue, material_costs });
      let { error } = await supabase.from('finances').update({ ...entry, revenue, material_costs }).eq('id', id.toString());
      if (error) {
        console.error("SUPABASE UPDATE ERROR (with new columns):", error);
        console.log("FALLING BACK TO OLD UPDATE (amount only)");
        await supabase.from('finances').update(entry).eq('id', id.toString());
      } else {
        console.log("SUPABASE UPDATE SUCCESS");
      }
    } catch(e) { console.error(e); }
  },


  generateDemoBooking: async ({ cookies }) => {
    if (cookies?.get('adminSession') === 'viewer') return;
    if (cookies.get('adminSession') !== 'dev') return;

    try {
      const randomString = () => Math.random().toString(36).substring(2, 8).toUpperCase();
      const demoNames = ['Max Mustermann', 'Julia Weber', 'Thomas Schmidt', 'Sarah Lehmann'];
      const demoBikes = ['Mountainbike', 'Citybike', 'E-Bike', 'Rennrad'];
      const demoProblems = ['Platter Reifen', 'Kette quietscht', 'Bremsen kaputt', 'Große Inspektion', 'Schaltung einstellen'];
      
      await supabase.from('bookings').insert({
        id: randomString(),
        name: demoNames[Math.floor(Math.random() * demoNames.length)],
        phone: '0151-' + Math.floor(Math.random() * 9000000 + 1000000),
        bikeType: demoBikes[Math.floor(Math.random() * demoBikes.length)],
        problem: demoProblems[Math.floor(Math.random() * demoProblems.length)],
        status: 'Neu',
        createdAt: new Date().toISOString(),
        messages: []
      });
    } catch (e) {
      console.error("Error generating demo booking:", e);
    }
  },

  updateStatus: async ({ request, cookies }) => {
    if (cookies?.get('adminSession') === 'viewer') return;
    const data = await request.formData();
    const id = data.get('id');
    const newStatus = data.get('status');

    if (!id || !newStatus) return;

    try {
      await supabase.from('bookings').update({ status: newStatus }).eq('id', id);
    } catch (e) {
      console.error("Error updating status:", e);
    }
  },



  deleteBooking: async ({ request, cookies }) => {
    if (cookies.get('adminSession') !== 'dev') return;

    const data = await request.formData();
    const id = data.get('id');

    if (!id) return;

    try {
      await supabase.from('bookings').delete().eq('id', id);
    } catch (e) {
      console.error("Error deleting booking:", e);
    }
  },

  updateSettings: async ({ request, cookies }) => {
    if (cookies.get('adminSession') === 'viewer') return;
    const data = await request.formData();
    const status = data.get('status');
    const viewer_password = data.get('viewer_password');
    if (!status) return;
    try {
      const payload = { id: 'shop', status: status.toString() };
      if (viewer_password !== null) payload.viewer_password = viewer_password.toString();
      const { error } = await supabase.from('settings').upsert(payload);
      if (error) console.error("Database upsert error in settings:", error);
    } catch (e) { console.error(e); }
  },

  clearAll: async ({ cookies }) => {
    if (cookies?.get('adminSession') === 'viewer') return;
    if (cookies.get('adminSession') === 'dev') {
      try {
        await supabase.from('bookings').delete().neq('id', '0');
        await supabase.from('inventory').delete().neq('id', '0');
        await supabase.from('finances').delete().neq('id', '0');
        await supabase.from('notes').delete().neq('id', 0);
      } catch (e) { console.error(e); }
    }
  },

  logout: async ({ cookies }) => {
    cookies.delete('adminSession', { path: '/' });
    throw redirect(303, '/admin/login');
  }
};
