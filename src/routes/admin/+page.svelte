<script>
  import { enhance } from '$app/forms';
  export let data;
  
  const statusOptions = ['Neu', 'In Bearbeitung', 'Ersatzteile bestellt', 'Abholbereit', 'Fahrrad abgeholt'];
  let currentFilter = 'Alle';
  let isMobileMenuOpen = false;

  let currentTab = 'cockpit'; // 'cockpit' | 'auftraege' | 'chat' | 'kunden' | 'lager' | 'finanzen' | 'settings'
  let selectedChatId = null;

  // Real Data from Server
  $: inventory = data.inventory || [];
  $: finances = data.finances || [];
  $: notesText = data.notes && data.notes.length > 0 ? data.notes[0].text : '';

  let printReceiptData = null;
  function printFinanceReceipt(f) {
    printReceiptData = f;
    setTimeout(() => window.print(), 100);
  }

  // Reactive variables for filtering and stats
  $: bookings = data.bookings;
  $: filteredBookings = (currentFilter === 'Alle' 
    ? bookings.filter(b => b.status !== 'Abgeschlossen' && b.status !== 'Fahrrad abgeholt')
    : bookings.filter(b => b.status === currentFilter))
    .sort((a, b) => a.name.localeCompare(b.name, 'de', { sensitivity: 'base' }));

  $: availableLetters = [...new Set(filteredBookings.map(b => (b.name[0] || '#').toUpperCase()))].sort();
    
  $: stats = {
    total: bookings.filter(b => b.status !== 'Abgeschlossen' && b.status !== 'Fahrrad abgeholt').length,
    neu: bookings.filter(b => b.status === 'Neu').length,
    active: bookings.filter(b => b.status === 'In Bearbeitung' || b.status === 'Ersatzteile bestellt').length,
    ready: bookings.filter(b => b.status === 'Abholbereit').length
  };

  $: bookingsWithMessages = bookings
    .filter(b => b.messages && b.messages.length > 0 && b.status !== 'Abgeschlossen' && b.status !== 'Fahrrad abgeholt')
    .sort((a,b) => new Date(b.messages[b.messages.length - 1].timestamp) - new Date(a.messages[a.messages.length - 1].timestamp));

  $: unreadCount = bookingsWithMessages.filter(b => b.messages[b.messages.length - 1].sender === 'Kunde').length;

  // Group bookings by phone number to create unique customers list
  $: customerMap = bookings.reduce((acc, b) => {
    if (!acc[b.phone]) {
      acc[b.phone] = { phone: b.phone, names: new Set(), tickets: 0, latestDates: [] };
    }
    acc[b.phone].names.add(b.name);
    acc[b.phone].tickets += 1;
    acc[b.phone].latestDates.push(new Date(b.createdAt));
    return acc;
  }, {});

  $: customers = Object.values(customerMap).map(c => ({
    name: Array.from(c.names).join(' / '),
    phone: c.phone,
    tickets: c.tickets,
    latestActivity: new Date(Math.max(...c.latestDates))
  })).sort((a,b) => b.latestActivity - a.latestActivity);

  function formatDate(isoString) {
    const d = new Date(isoString);
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }).format(d);
  }

  function getStatusColor(status) {
    switch(status) {
      case 'Neu': return 'status-new';
      case 'In Bearbeitung': return 'status-progress';
      case 'Ersatzteile bestellt': return 'status-waiting';
      case 'Abholbereit': return 'status-ready';
      case 'Abgeschlossen': return 'status-done';
      default: return 'status-new';
    }
  }
</script>

<div class="dashboard">
  <header class="admin-header">
    <div class="logo">
      <img src="/images/logo.png" alt="Fahrradschrauber Logo" class="brand-logo" />
      <span>Fahrradschrauber</span>
    </div>
    <div class="admin-actions desktop-only">
      {#if data.role === 'dev'}
        <span class="badge badge-dev">DEV MODE</span>
      {/if}
      <a href="/" class="btn-outline">Zur Website</a>
      <form method="POST" action="?/logout" use:enhance style="display: inline;">
        <button class="btn-outline btn-danger">Abmelden</button>
      </form>
    </div>
    <button class="menu-toggle mobile-only" on:click={() => isMobileMenuOpen = !isMobileMenuOpen} aria-label="Menü">
      {#if isMobileMenuOpen}
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
      {/if}
    </button>
  </header>

  {#if isMobileMenuOpen}
    <div class="mobile-menu">
      <nav class="mobile-nav">
        {#if data.role === 'dev'}
          <span class="badge badge-dev" style="margin-bottom: 12px; align-self: center;">DEV MODE</span>
        {/if}
        <a href="/" class="btn-outline mobile-btn" style="text-align: center;" on:click={() => isMobileMenuOpen = false}>Zur Website</a>
        <form method="POST" action="?/logout" use:enhance style="width: 100%;">
          <button class="btn-outline btn-danger mobile-btn" style="width: 100%;">Abmelden</button>
        </form>
      </nav>
    </div>
  {/if}

  <main class="content container">
    <!-- Main Tabs -->
    <div class="main-tabs">
      <button class="main-tab {currentTab === 'cockpit' ? 'active-tab' : ''}" on:click={() => currentTab = 'cockpit'}>
        🏛️ Cockpit
      </button>
      <button class="main-tab {currentTab === 'auftraege' ? 'active-tab' : ''}" on:click={() => currentTab = 'auftraege'}>
        📦 Aufträge
      </button>
      <button class="main-tab {currentTab === 'chat' ? 'active-tab' : ''}" on:click={() => currentTab = 'chat'}>
        💬 Chat
        {#if unreadCount > 0}
          <span class="unread-badge">{unreadCount}</span>
        {/if}
      </button>
      <button class="main-tab {currentTab === 'kunden' ? 'active-tab' : ''}" on:click={() => currentTab = 'kunden'}>
        👥 Kunden
      </button>
      <button class="main-tab {currentTab === 'lager' ? 'active-tab' : ''}" on:click={() => currentTab = 'lager'}>
        🧰 Lager
        {#if inventory.some(i => i.count < i.min)}
          <span class="unread-dot"></span>
        {/if}
      </button>
      <button class="main-tab {currentTab === 'finanzen' ? 'active-tab' : ''}" on:click={() => currentTab = 'finanzen'}>
        💶 Finanzen
      </button>
      <button class="main-tab {currentTab === 'settings' ? 'active-tab' : ''}" on:click={() => currentTab = 'settings'}>
        ⚙️ System
      </button>
    </div>

    {#if currentTab === 'cockpit'}
      <div class="controls-row">
        <h2>Management Cockpit</h2>
        <p class="text-muted">Willkommen zurück. Hier ist die Zusammenfassung für heute.</p>
      </div>

      <div class="stats-grid" style="margin-bottom: 24px;">
        <div class="stat-card" style="align-items: flex-start;">
          <div class="stat-label">Umsatz (Dieser Monat)</div>
          <div class="stat-value" style="color: #10b981;">{finances.reduce((sum, f) => sum + f.amount, 0).toFixed(2)} €</div>
          <div style="font-size: 0.8rem; color: #10b981;">+12% zum Vormonat</div>
        </div>
        <div class="stat-card stat-active" style="align-items: flex-start;">
          <div class="stat-label">Aktive Räder in Werkstatt</div>
          <div class="stat-value">{stats.active}</div>
          <div style="font-size: 0.8rem; color: var(--color-text-muted);">Auslastung: ~65%</div>
        </div>
        <div class="stat-card stat-new" style="align-items: flex-start;">
          <div class="stat-label">Neue Terminanfragen</div>
          <div class="stat-value">{stats.neu}</div>
          <button class="btn-outline" style="margin-top: 8px; font-size: 0.75rem; padding: 4px 8px;" on:click={() => currentTab = 'auftraege'}>Jetzt bearbeiten</button>
        </div>
      </div>

      <div class="settings-grid">
        <div class="booking-card">
          <h3 style="margin-bottom: 16px;">📌 Interne Werkstatt-Notizen</h3>
          <form method="POST" action="?/saveNote" use:enhance>
            <textarea name="text" class="chat-input" rows="5" style="width: 100%; margin-bottom: 12px; font-family: 'Comic Sans MS', cursive, sans-serif; background: rgba(234, 179, 8, 0.1); color: #fde047; border: 1px dashed rgba(234, 179, 8, 0.4);" placeholder="Hier To-Dos für Kollegen eintragen...">{notesText}</textarea>
            <button type="submit" class="btn-primary" style="width: 100%;">Notiz Speichern</button>
          </form>
        </div>

        <div class="booking-card" style="border-left-color: var(--color-primary);">
          <h3 style="margin-bottom: 16px;">🎫 Manueller Laufkunde (Offline)</h3>
          <p class="text-muted" style="font-size: 0.9rem; margin-bottom: 16px;">Erstelle intern ein neues Ticket für Kunden, die direkt in den Laden kommen.</p>
          <form method="POST" action="?/createOfflineBooking" use:enhance class="chat-form" style="flex-direction: column; align-items: stretch; gap: 8px;" on:submit={(e) => { e.target.reset(); alert('✅ Offline-Ticket wurde erfolgreich angelegt!'); }}>
            <input type="text" name="name" placeholder="Name des Kunden" required class="chat-input" style="width: 100%;">
            <input type="tel" name="phone" placeholder="Telefon (optional)" class="chat-input" style="width: 100%;">
            <input type="text" name="bikeType" placeholder="Fahrrad-Modell" required class="chat-input" style="width: 100%;">
            <button type="submit" class="btn-primary" style="margin-top: 8px;">Ticket erstellen & Drucken</button>
          </form>
        </div>
      </div>

    {:else if currentTab === 'auftraege'}
    <!-- Stats Cards -->
    <div class="stats-grid">
      <button class="stat-card {currentFilter === 'Alle' ? 'active-card' : ''}" on:click={() => currentFilter = 'Alle'}>
        <div class="stat-value">{stats.total}</div>
        <div class="stat-label">Alle Termine</div>
      </button>
      <button class="stat-card stat-new {currentFilter === 'Neu' ? 'active-card' : ''}" on:click={() => currentFilter = 'Neu'}>
        <div class="stat-value">{stats.neu}</div>
        <div class="stat-label">Neue Anfragen</div>
      </button>
      <button class="stat-card stat-active {currentFilter === 'In Bearbeitung' ? 'active-card' : ''}" on:click={() => currentFilter = 'In Bearbeitung'}>
        <div class="stat-value">{stats.active}</div>
        <div class="stat-label">In der Werkstatt</div>
      </button>
      <button class="stat-card stat-ready {currentFilter === 'Abholbereit' ? 'active-card' : ''}" on:click={() => currentFilter = 'Abholbereit'}>
        <div class="stat-value">{stats.ready}</div>
        <div class="stat-label">Zur Abholung</div>
      </button>
    </div>

    <div class="controls-row">
      <h2>Aufträge verwalten</h2>
      <!-- Filters -->
      <div class="filters">
        <button 
          class="filter-btn {currentFilter === 'Alle' ? 'active' : ''}" 
          on:click={() => currentFilter = 'Alle'}>Alle</button>
        {#each statusOptions as option}
          <button 
            class="filter-btn {currentFilter === option ? 'active' : ''}" 
            on:click={() => currentFilter = option}>{option}</button>
        {/each}
      </div>
    </div>

    {#if filteredBookings.length === 0}
      <div class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
        <h3>Keine Einträge bei "{currentFilter}"</h3>
        <p>In dieser Kategorie gibt es aktuell keine Kunden.</p>
      </div>
    {:else}
      <div class="alphabet-index">
        {#each availableLetters as letter}
          <a href="#letter-{letter}" class="letter-btn" on:click|preventDefault={() => {
            const el = document.getElementById('letter-' + letter);
            if (el) {
              const y = el.getBoundingClientRect().top + window.scrollY - 100;
              window.scrollTo({top: y, behavior: 'smooth'});
            }
          }}>{letter}</a>
        {/each}
      </div>

      <div class="bookings-grid">
        {#each filteredBookings as booking, index}
          {@const firstChar = (booking.name[0] || '#').toUpperCase()}
          {@const isFirstOfLetter = index === 0 || (filteredBookings[index - 1].name[0] || '#').toUpperCase() !== firstChar}
          
          {#if isFirstOfLetter}
            <div id="letter-{firstChar}" class="letter-header">{firstChar}</div>
          {/if}

          <div class="booking-card {getStatusColor(booking.status)}">
            <div class="booking-header">
              <div style="display: flex; flex-direction: column; gap: 6px;">
                <h3 style="margin: 0;">{booking.name} <span class="booking-date">({formatDate(booking.createdAt)})</span></h3>
                {#if customerMap[booking.phone] && customerMap[booking.phone].tickets > 1}
                  <span class="badge" style="background:#fef08a; color: #fef08a; font-size:0.75rem; align-self: flex-start; padding: 2px 8px; border-radius: 12px; border: 1px solid #fde047;">
                    ⭐ Wiederkehrender Kunde ({customerMap[booking.phone].tickets}. Auftrag)
                  </span>
                {/if}
              </div>
              
              <!-- Action forms -->
              <div class="card-actions" style="flex-wrap: wrap;">
                <!-- Mechanic Assignment -->
                <form method="POST" action="?/assignMechanic" use:enhance style="margin-right: auto; display:flex; align-items:center; gap:8px;">
                  <input type="hidden" name="id" value={booking.id}>
                  <label for="mech-{booking.id}" style="font-size:0.8rem; color:var(--color-text-muted);">🛠️ Mechaniker:</label>
                  <select id="mech-{booking.id}" name="mechanic" class="chat-input" style="padding: 4px 8px; width:130px; font-size:0.85rem;" on:change={(e) => e.target.form.requestSubmit()}>
                    <option value="Nicht zugewiesen" selected={!booking.mechanic || booking.mechanic === 'Nicht zugewiesen'}>Frei</option>
                    <option value="Larsi" selected={booking.mechanic === 'Larsi'}>Larsi</option>
                    <option value="Chef" selected={booking.mechanic === 'Chef'}>Chef</option>
                    <option value="Azubi" selected={booking.mechanic === 'Azubi'}>Azubi</option>
                  </select>
                </form>

                <div class="status-pills">
                  {#each statusOptions as option}
                    <form method="POST" action="?/updateStatus" use:enhance style="margin: 0;">
                      <input type="hidden" name="id" value="{booking.id}">
                      <input type="hidden" name="status" value="{option}">
                      <button type="submit" class="pill-btn {booking.status === option ? 'active-pill' : ''}" on:click={(e) => { if (booking.status !== option && !confirm(`Status für ${booking.name} wirklich auf "${option}" ändern?`)) e.preventDefault(); }}>
                        {option}
                      </button>
                    </form>
                  {/each}
                </div>

                {#if data.role === 'dev'}
                  <form method="POST" action="?/deleteBooking" use:enhance>
                    <input type="hidden" name="id" value="{booking.id}">
                    <button class="delete-btn" title="Löschen" on:click={(e) => { if(!confirm(`Auftrag von ${booking.name} wirklich löschen?`)) e.preventDefault(); }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                  </form>
                {/if}
              </div>
            </div>
            
            <div class="booking-details">
              <div class="detail-row" style="display: flex; align-items: center; gap: 8px;">
                <strong>Telefon:</strong> 
                <span>{booking.phone}</span>
                <a href="tel:{booking.phone}" class="icon-btn-green" title="Kunden anrufen" aria-label="Anrufen">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </a>
              </div>
              <div class="detail-row">
                <strong>Fahrrad:</strong> {booking.bikeType}
              </div>
              <div class="detail-row">
                <strong>Ticket-ID:</strong> <code class="ticket-badge">{booking.id}</code>
              </div>
            </div>

            <div class="booking-problem">
              <strong>Aufgabe / Problem:</strong>
              <p>{booking.problem}</p>
            </div>

            {#if booking.status === 'Abholbereit' || booking.status === 'Abgeschlossen' || booking.status === 'Fahrrad abgeholt'}
            <div class="payment-section" style="margin-top: 16px; padding: 16px; background: var(--color-bg-alt); border: 1px dashed var(--border-color); border-radius: 8px;">
              <h4 style="margin-bottom: 8px;">💶 Abrechnung</h4>
              <form method="POST" action="?/checkoutBooking" use:enhance style="display: flex; gap: 8px; flex-wrap: wrap;" on:submit={() => setTimeout(() => alert('Zahlung wurde erfolgreich ins Kassenbuch verbucht!'), 200)}>
                <input type="hidden" name="id" value={booking.id}>
                <input type="text" name="desc" value="Reparatur {booking.bikeType}" required class="chat-input" style="flex: 1; min-width: 150px;" placeholder="Leistung">
                <input type="number" step="0.01" name="amount" placeholder="Betrag (€)" required class="chat-input" style="width: 100px;">
                <select name="method" class="chat-input" style="width: 120px;">
                  <option value="Bar">Barzahlung</option>
                  <option value="EC">EC-Karte</option>
                </select>
                <button type="submit" class="btn-primary" style="padding: 8px 16px;">Kassieren & Buchen</button>
              </form>
            </div>
            {/if}

          </div>
        {/each}
      </div>
    {/if}

    {:else if currentTab === 'chat'}
      <div class="chat-dashboard">
        <div class="chat-sidebar">
          {#if bookingsWithMessages.length === 0}
            <p class="text-muted" style="padding: 24px; text-align: center; font-style: italic;">Bisher keine Konversationen.</p>
          {:else}
            {#each bookingsWithMessages as chat}
              {@const lastMsg = chat.messages[chat.messages.length - 1]}
              {@const isUnread = lastMsg.sender === 'Kunde'}
              <button class="chat-list-item {selectedChatId === chat.id ? 'selected' : ''}" on:click={() => selectedChatId = chat.id}>
                <div class="chat-list-header">
                  <strong>{chat.name}</strong>
                  {#if isUnread}
                    <span class="unread-dot-small"></span>
                  {/if}
                </div>
                <div class="chat-preview">{lastMsg.text}</div>
                <div class="chat-time">{new Intl.DateTimeFormat('de-DE', {hour: '2-digit', minute:'2-digit', day: '2-digit', month: '2-digit'}).format(new Date(lastMsg.timestamp))}</div>
              </button>
            {/each}
          {/if}
        </div>
        <div class="chat-main">
          {#if selectedChatId}
            {@const activeChat = bookings.find(b => b.id === selectedChatId)}
            {#if activeChat}
              <div class="chat-header">
                <h3>Chat mit {activeChat.name}</h3>
                <span class="chat-ticket">Ticket: <code>{activeChat.id}</code></span>
              </div>
              <div class="chat-history active-chat-history">
                {#each activeChat.messages as msg}
                  <div class="msg {msg.sender === 'Kunde' ? 'msg-customer' : 'msg-shop'}">
                    <strong>{msg.sender}:</strong>
                    <p>{msg.text}</p>
                    <span class="time">{new Intl.DateTimeFormat('de-DE', {hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit'}).format(new Date(msg.timestamp))}</span>
                  </div>
                {/each}
              </div>
              <form method="POST" action="?/replyMessage" use:enhance class="chat-form">
                <input type="hidden" name="id" value="{activeChat.id}">
                <textarea name="message" placeholder="Antwort an {activeChat.name}..." required rows="2" class="chat-input"></textarea>
                <button type="submit" class="btn btn-primary" style="height: 100%;">Senden</button>
              </form>
            {/if}
          {:else}
            <div class="empty-chat-main">
              <p>Wähle links einen Chat aus, um die Nachrichten anzuzeigen.</p>
            </div>
          {/if}
        </div>
      </div>

    {:else if currentTab === 'kunden'}
      <div class="controls-row">
        <h2>Kundenkartei</h2>
        <p class="text-muted">Hier sehen Sie alle einzigartigen Kunden, gruppiert nach Telefonnummer.</p>
      </div>
      <div class="customers-grid">
        {#each customers as customer}
          <div class="booking-card">
            <div class="booking-header" style="border-bottom: none; padding-bottom: 0px; margin-bottom: 12px;">
              <h3 style="display:flex; align-items:center; gap:8px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="var(--color-primary)" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                {customer.name}
              </h3>
            </div>
            <div class="booking-details" style="margin-bottom: 0;">
              <div class="detail-row">
                <strong>Telefonnummer:</strong> 
                <a href="tel:{customer.phone}">{customer.phone}</a>
              </div>
              <div class="detail-row">
                <strong>Anzahl Tickets:</strong> <span class="badge" style="background:var(--color-bg-alt); color:var(--color-text); border:1px solid var(--border-color); padding:2px 8px; border-radius:12px;">{customer.tickets}</span>
              </div>
              <div class="detail-row">
                <strong>Letzte Aktivität:</strong> {new Intl.DateTimeFormat('de-DE', {dateStyle: 'medium'}).format(customer.latestActivity)}
              </div>
            </div>
          </div>
        {/each}
      </div>

    {:else if currentTab === 'lager'}
      <div class="controls-row">
        <h2>Ersatzteil-Lager</h2>
        <form method="POST" action="?/addInventory" use:enhance style="display: flex; gap: 8px; flex-wrap:wrap;" on:submit={(e) => setTimeout(() => e.target.reset(), 100)}>
          <input type="text" name="name" placeholder="Artikel Name" required class="chat-input" style="width: 200px;">
          <input type="number" name="min" placeholder="Warnung bei <" required class="chat-input" style="width: 130px;">
          <input type="number" step="0.01" name="price" placeholder="Preis (€)" required class="chat-input" style="width: 100px;">
          <button type="submit" class="btn-primary">+ Hinzufügen</button>
        </form>
      </div>

      <div class="booking-card" style="padding: 0; overflow: hidden;">
        <table class="data-table">
          <thead>
            <tr>
              <th>Artikel / Bauteil</th>
              <th>Bestand</th>
              <th>Meldebestand (Min)</th>
              <th>Verkaufspreis</th>
              <th>Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {#each inventory as item}
              <tr class={item.count < item.min ? 'row-alert' : ''}>
                <td><strong>{item.name}</strong>
                  {#if item.count < item.min}
                    <span class="badge badge-dev" style="background:#ef4444; margin-left: 8px;">NACHBESTELLEN</span>
                  {/if}
                </td>
                <td style="font-size: 1.2rem; font-weight: 700;">{item.count}</td>
                <td class="text-muted">{item.min}</td>
                <td>{item.price.toFixed(2)} €</td>
                <td style="display: flex; gap: 8px; flex-wrap:wrap;">
                  <form method="POST" action="?/updateInventoryCount" use:enhance style="margin:0;">
                    <input type="hidden" name="id" value={item.id}>
                    <input type="hidden" name="change" value="-1">
                    <button type="submit" class="btn-outline" style="padding: 4px 8px;" title="Verbauen">-1</button>
                  </form>
                  <form method="POST" action="?/updateInventoryCount" use:enhance style="margin:0;">
                    <input type="hidden" name="id" value={item.id}>
                    <input type="hidden" name="change" value="10">
                    <button type="submit" class="btn-outline" style="padding: 4px 8px;" title="Liefern">+10</button>
                  </form>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

    {:else if currentTab === 'finanzen'}
      <div class="controls-row hide-print">
        <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
          <h2>Kassenbuch & Rechnungen</h2>
          <button class="btn btn-outline" on:click={() => window.print()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="margin-right: 8px;"><path stroke-linecap="round" stroke-linejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            Gesamtes Kassenbuch PDF
          </button>
        </div>
        <form method="POST" action="?/addFinance" use:enhance style="display: flex; gap: 8px; flex-wrap:wrap; margin-top: 16px;" on:submit={(e) => setTimeout(() => e.target.reset(), 100)}>
          <input type="text" name="desc" placeholder="Leistung / Beschreibung" required class="chat-input" style="width: 250px;">
          <input type="number" step="0.01" name="amount" placeholder="Betrag (€)" required class="chat-input" style="width: 120px;">
          <button type="submit" class="btn-primary">+ Buchung eintragen</button>
        </form>
      </div>

      <div class="stats-grid" style="margin-bottom: 24px;">
        <div class="stat-card" style="align-items: flex-start;">
          <div class="stat-value">{finances.reduce((sum, f) => sum + f.amount, 0).toFixed(2)} €</div>
          <div class="stat-label">Tageseinnahmen Heute</div>
        </div>
        <div class="stat-card" style="align-items: flex-start;">
          <div class="stat-value">{(finances.reduce((sum, f) => sum + f.amount, 0) * 4.2).toFixed(2)} €</div>
          <div class="stat-label">Umsatz Monat (Prognose)</div>
        </div>
      </div>

      <div class="printable-finance-table" style="width: 100%;">
        <div class="print-header" style="display: none; padding: 32px 32px 24px; text-align: center; color: black; background: white;">
          <h2 style="margin-bottom: 8px; font-size: 24px;">Fahrradschrauber Mülheim-Heimaterde</h2>
          <h3 style="color: #444; margin-bottom: 12px;">Monatliche Finanzübersicht & Kassenbuch</h3>
          <p style="font-size: 14px; color: #666;">Erstellt am: {new Intl.DateTimeFormat('de-DE', { dateStyle: 'long' }).format(new Date())}</p>
          <hr style="margin-top: 24px; border: none; border-top: 2px solid #000;">
        </div>

        <div class="booking-card border-for-print" style="padding: 0; overflow: hidden; background: var(--color-bg-card);">
          <table class="data-table">
            <thead>
              <tr>
                <th>Datum</th>
                <th>Beschreibung / Leistung</th>
                <th>Betrag</th>
                <th class="hide-print">Beleg</th>
              </tr>
            </thead>
            <tbody>
              {#each finances as f}
                <tr>
                  <td>{new Intl.DateTimeFormat('de-DE', {dateStyle: 'medium', timeStyle: 'short'}).format(new Date(f.date))}</td>
                  <td><strong>{f.desc}</strong></td>
                  <td style="color: #10b981; font-weight: 700;">+ {f.amount.toFixed(2)} €</td>
                  <td class="hide-print"><button class="btn-outline" style="padding: 4px 8px;" on:click={() => printFinanceReceipt(f)}>📄 Einzel-Beleg</button></td>
                </tr>
              {/each}
            </tbody>
            <tfoot class="print-only" style="display: none; background: #f8fafc; border-top: 2px solid #000;">
              <tr>
                <td colspan="2" style="text-align: right; font-weight: bold; padding: 16px; color: black;">Gesamtsumme:</td>
                <td colspan="2" style="font-weight: bold; font-size: 1.2rem; padding: 16px; color: black;">{finances.reduce((sum, f) => sum + f.amount, 0).toFixed(2)} €</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

    {:else if currentTab === 'settings'}
      <div class="controls-row">
        <h2>Werkstatt & System Einstellungen</h2>
      </div>

      <div class="settings-grid">
        <div class="booking-card">
          <h3>👤 Werkstatt Profil</h3>
          <p class="text-muted" style="font-size: 0.9rem; margin-bottom: 16px;">Verwalten Sie die öffentlichen Anzeige-Einstellungen. Bei Urlaubsmodus werden Online-Buchungen blockiert.</p>
          
          <div style="margin-bottom: 16px; font-weight: 500; font-size: 1.05rem;">
            Aktueller Status: <span style="color: var(--color-primary);">{data.settings?.status || 'Geöffnet (Regulär)'}</span>
          </div>

          <form method="POST" action="?/updateSettings" use:enhance style="display: flex; flex-direction: column; gap: 12px;">
            <div>
              <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:4px;">Werkstatt Status Ändern</label>
              <div style="display: flex; gap: 8px;">
                <select name="status" class="chat-input" style="width: 100%;" value={data.settings?.status || 'Geöffnet (Regulär)'}>
                  <option value="Geöffnet (Regulär)">Geöffnet (Regulär)</option>
                  <option value="Urlaubsmodus (Keine neuen Termine)">Urlaubsmodus (Keine neuen Termine)</option>
                  <option value="Ausgebucht (Warteschlange)">Ausgebucht (Warteschlange)</option>
                </select>
                <input type="hidden" name="viewer_password" value={data.settings?.viewer_password || ''}>
                <button type="submit" class="btn btn-primary" style="white-space: nowrap;">Status Speichern</button>
              </div>
            </div>
          </form>

          <div style="margin-top: 32px; padding-top: 24px; border-top: 1px dashed var(--border-color);">
            <h4 style="margin-bottom: 8px;">👁️ Gast-Zugang (Read-Only)</h4>
            <p class="text-muted" style="font-size: 0.9rem; margin-bottom: 12px;">Erstellen Sie ein Passwort für den Benutzer "gast", um jemanden gefahrlos ins Backend schauen zu lassen (Nur-Lese-Rechte).</p>
            <form method="POST" action="?/updateSettings" use:enhance style="display: flex; gap: 8px;">
              <input type="hidden" name="status" value={data.settings?.status || 'Geöffnet (Regulär)'}>
              <input type="text" name="viewer_password" class="chat-input" placeholder="Passwort, z.B. fahrradGast" value={data.settings?.viewer_password || ''} style="width: 100%;">
              <button type="submit" class="btn btn-primary" style="white-space: nowrap;">Gast-Login Speichern</button>
            </form>
          </div>
        </div>

        {#if data.role === 'dev'}
          <div class="dev-tools" style="margin-bottom: 0;">
            <h3>🛠 System Developer Tools</h3>
            <p><strong>Database Storage:</strong> JSON Flatfile (Active). <strong>{stats.total} aktive Reihen.</strong></p>
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
              <form method="POST" action="?/generateDemoBooking" use:enhance>
                <button class="btn-primary" style="padding: 6px 16px; border-radius: 4px; font-size: 0.85rem;">+ Demo-Kunde generieren</button>
              </form>
              <form method="POST" action="?/clearAll" use:enhance>
                <button class="btn-danger btn-sm" style="padding: 6px 16px; border-radius: 4px; font-size: 0.85rem;" on:click={(e) => { if(!confirm('ACHTUNG: ALLE DATEN LÖSCHEN? DIES KANN NICHT RÜCKGÄNGIG GEMACHT WERDEN!')) e.preventDefault(); }}>
                  Datenbank leeren (Flush)
                </button>
              </form>
            </div>
          </div>
        {/if}
      </div>
    {/if}
  </main>
</div>

{#if printReceiptData}
<div class="printable-receipt" style="display: none;">
  <div style="text-align: center; margin-bottom: 24px;">
    <h2 style="margin: 0;">Fahrradschrauber Mülheim</h2>
    <p style="margin: 4px 0; color: #666;">Kassenbeleg</p>
  </div>
  <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.9rem;">
    <span>Datum:</span> <strong>{new Intl.DateTimeFormat('de-DE', {dateStyle: 'medium', timeStyle: 'short'}).format(new Date(printReceiptData.date))}</strong>
  </div>
  <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.9rem;">
    <span>Leistung / Info:</span> <strong>{printReceiptData.desc}</strong>
  </div>
  <div style="display: flex; justify-content: space-between; margin-top: 12px; padding-top: 8px; border-top: 1px dashed #ccc; font-weight: bold; font-size: 1.2rem;">
    <span>Betrag dankend erhalten</span>
    <span>{printReceiptData.amount.toFixed(2)} €</span>
  </div>
  <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.9rem; margin-top: 4px;">
    <span>Zahlungsart:</span> <strong>Barzahlung</strong>
  </div>
  <div style="text-align: center; margin-top: 32px; font-size: 0.8rem; color: #666;">
    Vielen Dank für Ihren Besuch!<br>
    Wir wünschen eine gute Fahrt.
  </div>
</div>
{/if}

<style>
  @media print {
    body * { visibility: hidden; }
    .printable-receipt, .printable-receipt * { visibility: visible; }
    .printable-receipt {
      display: block !important;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      background: var(--color-bg-card);
      padding: 0;
      margin: 0;
    }
  }

  .dashboard {
    min-height: 100vh;
    background: var(--color-bg-alt);
    font-family: var(--font-body);
  }

  .admin-header {
    background: var(--color-bg);
    border-bottom: 1px solid var(--border-color);
    padding: 16px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 700;
    color: var(--color-text);
  }

  .brand-logo {
    height: 44px;
    width: auto;
    object-fit: contain;
  }

  .admin-actions {
    display: flex;
    gap: 12px;
  }

  .btn-outline {
    padding: 8px 16px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    text-decoration: none;
    color: var(--color-text);
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    background: transparent;
  }

  .btn-outline:hover {
    background: var(--color-bg-alt);
  }

  .btn-danger {
    color: #dc2626;
    border-color: #fca5a5;
  }
  .btn-danger:hover {
    background: rgba(220, 38, 38, 0.1);
    border-color: #dc2626;
  }

  .mobile-only {
    display: none;
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--color-text);
  }

  .mobile-menu {
    position: absolute;
    top: 76px;
    left: 0;
    width: 100%;
    background: rgba(31, 41, 55, 0.98);;
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border-color);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    padding: 24px;
    z-index: 50;
    animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .mobile-btn {
    width: 100%;
    padding: 12px;
    font-size: 1.1rem;
  }

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 32px 24px;
  }

  /* Stats Grid */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 32px;
  }

  .stat-card {
    background: var(--color-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-sm);
    cursor: pointer;
    transition: all 0.2s ease;
    width: 100%;
    font-family: inherit;
  }

  .stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  .stat-card.active-card {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px var(--color-primary) inset, 0 4px 6px rgba(0, 0, 0, 0.05);
  }

  .stat-value {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--color-text);
    line-height: 1;
    margin-bottom: 8px;
  }

  .stat-label {
    font-size: 0.9rem;
    color: var(--color-text-muted);
    font-weight: 500;
    text-transform: uppercase;
  }

  .stat-new .stat-value { color: #3b82f6; }
  .stat-active .stat-value { color: #eab308; }
  .stat-ready .stat-value { color: #22c55e; }

  /* Controls Row */
  .controls-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    flex-wrap: wrap;
    gap: 16px;
  }

  .controls-row h2 {
    font-size: 1.5rem;
  }

  .filters {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .filter-btn {
    padding: 6px 14px;
    border-radius: 20px;
    border: 1px solid var(--border-color);
    background: var(--color-bg);
    color: var(--color-text-muted);
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .filter-btn:hover {
    border-color: var(--color-text-muted);
  }

  .filter-btn.active {
    background: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
  }

  /* Empty State */
  .empty-state {
    background: var(--color-bg);
    border: 1px dashed var(--border-color);
    border-radius: var(--radius-lg);
    padding: 64px 24px;
    text-align: center;
    color: var(--color-text-muted);
  }

  .empty-state svg {
    margin-bottom: 16px;
    opacity: 0.5;
  }

  .empty-state h3 {
    color: var(--color-text);
    margin-bottom: 8px;
  }

  .badge-dev {
    background: #4f46e5;
    color: white;
    border: none;
    font-size: 0.75rem;
    padding: 6px 12px;
  }

  .dev-tools {
    background: var(--color-bg-alt);
    border: 1px dashed #94a3b8;
    border-radius: var(--radius-md);
    padding: 20px;
    margin-bottom: 24px;
  }

  .dev-tools h3 {
    margin-bottom: 8px;
    font-size: 1.1rem;
    color: #cbd5e1;
  }
  
  .dev-tools p {
    font-size: 0.9rem;
    color: var(--color-text-muted);
    margin-bottom: 16px;
  }

  /* Alphabet Index */
  .alphabet-index {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 24px;
    justify-content: flex-start;
  }
  .letter-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: var(--color-bg);
    border: 1px solid var(--border-color);
    color: var(--color-primary);
    font-weight: 700;
    text-decoration: none;
    transition: all 0.2s;
  }
  .letter-btn:hover {
    background: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
  }
  .letter-header {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--color-text);
    margin: 16px 0 4px 0;
    padding-bottom: 4px;
    border-bottom: 2px solid var(--border-color);
  }

  /* Grids */
  .bookings-grid {
    display: grid;
    gap: 16px;
  }

  .customers-grid, .settings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 16px;
  }

  /* Data Tables */
  .data-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
  }
  .data-table th {
    background: var(--color-bg-alt);
    color: var(--color-text-muted);
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.8rem;
    padding: 16px;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
  }
  .data-table td {
    padding: 16px;
    border-bottom: 1px solid var(--border-color);
    vertical-align: middle;
  }
  .data-table tr:last-child td {
    border-bottom: none;
  }
  .row-alert {
    background: rgba(220, 38, 38, 0.1);
  }

  .booking-card {
    background: var(--color-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: 24px;
    box-shadow: var(--shadow-sm);
    border-left: 4px solid var(--border-color);
  }

  .status-new { border-left-color: #3b82f6; } /* Blue */
  .status-progress { border-left-color: #eab308; } /* Yellow */
  .status-waiting { border-left-color: #f97316; } /* Orange */
  .status-ready { border-left-color: #22c55e; } /* Green */
  .status-done { opacity: 0.7; }

  .booking-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 16px;
    flex-wrap: wrap;
    gap: 12px;
  }

  .booking-header h3 {
    font-size: 1.15rem;
  }

  .booking-date {
    font-size: 0.85rem;
    color: var(--color-text-muted);
    font-weight: 400;
  }

  .card-actions {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }

  .status-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: center;
  }

  .pill-btn {
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    background: var(--color-bg-alt);
    border: 1px solid var(--border-color);
    color: var(--color-text-muted);
    transition: all 0.2s ease;
  }

  .pill-btn:hover {
    border-color: var(--color-text);
    color: var(--color-text);
  }

  .pill-btn.active-pill {
    background: var(--color-primary);
    border-color: var(--color-primary);
    color: white;
    font-weight: 600;
    box-shadow: var(--shadow-sm);
  }

  .delete-btn {
    background: transparent;
    border: 1px solid transparent;
    color: #ef4444;
    padding: 6px;
    border-radius: var(--radius-md);
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: background 0.2s;
  }

  .delete-btn:hover {
    background: rgba(220, 38, 38, 0.1);
  }

  .booking-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
    margin-bottom: 16px;
    font-size: 0.95rem;
  }

  .detail-row strong {
    color: var(--color-text-muted);
    font-weight: 500;
    margin-right: 4px;
  }

  .detail-row a {
    color: var(--color-primary);
    text-decoration: none;
  }

  .detail-row a:hover {
    text-decoration: underline;
  }

  .ticket-badge {
    background: var(--color-bg-alt);
    padding: 2px 8px;
    border-radius: 4px;
    font-family: monospace, Courier, sans-serif;
    font-weight: 700;
    color: var(--color-primary);
    border: 1px solid var(--border-color);
    letter-spacing: 1px;
  }

  .icon-btn-green {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    color: #059669;
    background: rgba(16, 185, 129, 0.1);
    text-decoration: none !important;
    transition: background 0.2s, transform 0.2s;
  }

  .icon-btn-green:hover {
    background: #bbf7d0;
    transform: scale(1.05);
  }

  .booking-problem {
    background: var(--color-bg-alt);
    padding: 16px;
    border-radius: var(--radius-md);
    font-size: 0.95rem;
  }

  .booking-problem strong {
    display: block;
    margin-bottom: 8px;
    color: var(--color-text-muted);
  }

  /* Main Tabs */
  .main-tabs { display: flex; gap: 16px; margin-bottom: 32px; border-bottom: 2px solid var(--border-color); overflow-x: auto; padding-bottom: 2px; }
  .main-tab { display: flex; align-items: center; padding: 12px 16px; font-size: 1.1rem; font-weight: 600; color: var(--color-text-muted); background: transparent; border: none; cursor: pointer; border-bottom: 3px solid transparent; margin-bottom: -2px; transition: all 0.2s; }
  .main-tab:hover { color: var(--color-text); }
  .main-tab.active-tab { color: var(--color-primary); border-bottom-color: var(--color-primary); }
  .unread-badge { background: #ef4444; color: white; border-radius: 12px; padding: 2px 8px; font-size: 0.8rem; margin-left: 8px; font-weight: 700; }

  /* Dedicated Chat Dashboard */
  .chat-dashboard {
    display: flex;
    height: 600px;
    background: var(--color-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
  }
  .chat-sidebar {
    width: 320px;
    border-right: 1px solid var(--border-color);
    overflow-y: auto;
    background: var(--color-bg-alt);
    display: flex;
    flex-direction: column;
  }
  .chat-list-item {
    display: block;
    width: 100%;
    text-align: left;
    padding: 16px;
    border: none;
    border-bottom: 1px solid var(--border-color);
    background: transparent;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.2s;
  }
  .chat-list-item:hover { background: rgba(0,0,0,0.02); }
  .chat-list-item.selected { background: var(--color-bg-card); border-left: 4px solid var(--color-primary); padding-left: 12px; }
  
  .chat-list-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; font-size: 1rem; color: var(--color-text); }
  .chat-preview { font-size: 0.85rem; color: var(--color-text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 6px; }
  .chat-time { font-size: 0.75rem; color: #94a3b8; }
  .unread-dot-small { width: 10px; height: 10px; background: #ef4444; border-radius: 50%; display: inline-block; }

  .chat-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: var(--color-bg-card);
  }
  .chat-header {
    padding: 16px 24px;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--color-bg-alt);
  }
  .chat-header h3 { margin: 0; font-size: 1.1rem; color: var(--color-text); }
  
  .chat-ticket { font-size: 0.85rem; color: var(--color-text-muted); }
  .chat-ticket code { background: var(--color-bg-card); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--border-color); color: var(--color-primary); font-weight: bold; }
  
  .active-chat-history {
    flex: 1;
    padding: 24px;
    padding-bottom: 12px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .chat-form {
    padding: 16px 24px;
    background: var(--color-bg-alt);
    border-top: 1px solid var(--border-color);
    display: flex;
    gap: 12px;
    align-items: flex-end;
  }
  .empty-chat-main {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: var(--color-text-muted);
    font-style: italic;
    background: var(--color-bg-alt);
  }

  .msg {
    padding: 10px 14px;
    border-radius: 12px;
    max-width: 80%;
    font-size: 0.95rem;
  }
  .msg-customer {
    background: var(--color-bg-card);
    border: 1px solid var(--border-color);
    align-self: flex-start;
    border-bottom-left-radius: 2px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  }
  .msg-shop {
    background: rgba(59, 130, 246, 0.1);
    color: #93c5fd;
    border: 1px solid rgba(59, 130, 246, 0.3);
    align-self: flex-end;
    border-bottom-right-radius: 2px;
  }
  .msg strong {
    font-size: 0.8rem;
    display: block;
    margin-bottom: 4px;
    opacity: 0.8;
  }
  .msg p {
    margin: 0;
    line-height: 1.4;
  }
  .msg .time {
    display: block;
    font-size: 0.7rem;
    margin-top: 4px;
    opacity: 0.6;
    text-align: right;
  }
  .chat-input {
    flex: 1;
    padding: 12px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    font-family: inherit;
    font-size: 0.95rem;
    resize: vertical;
  }
  .chat-input:focus {
    outline: none;
    border-color: var(--color-primary);
  }

  @media (max-width: 768px) {
    .chat-dashboard { flex-direction: column; height: auto; min-height: 600px; }
    .chat-sidebar { width: 100%; height: 250px; border-right: none; border-bottom: 1px solid var(--border-color); flex-shrink: 0; }
  }

  @media (max-width: 640px) {
    .desktop-only { display: none !important; }
    .mobile-only { display: block; }
    
    .admin-header {
      padding: 16px 20px;
    }

    .controls-row {
      flex-direction: column;
      align-items: flex-start;
    }

    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
    
    .stat-card {
      padding: 16px 12px;
    }

    .stat-value {
      font-size: 2rem;
    }

    .stat-label {
      font-size: 0.75rem;
      text-align: center;
    }

    .booking-card {
      padding: 16px;
      font-size: 0.95rem;
    }

    .controls-row h2 {
      font-size: 1.35rem;
      width: 100%;
    }

    /* Make Forms wrap into full-width columns on mobile */
    .controls-row form, 
    .payment-section form,
    .chat-form form {
      flex-direction: column !important;
      align-items: stretch !important;
      width: 100%;
    }

    /* Inputs & Buttons full width */
    .chat-input, .btn-primary, .btn-outline {
      width: 100% !important;
      font-size: 1rem; /* Verhindert iOS Auto-Zoom */
    }

    /* Wrap tables to scroll instead of breaking layout */
    .data-table {
      display: block;
      width: 100%;
      overflow-x: auto;
      white-space: nowrap;
    }
  }
</style>
