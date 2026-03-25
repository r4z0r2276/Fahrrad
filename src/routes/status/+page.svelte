<script>
  import { enhance } from '$app/forms';
  export let form;
  
  function getStatusInfo(status) {
    if (status === 'Neu') return { color: '#3b82f6', text: 'Warten auf Bearbeitung', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' };
    if (status === 'In Bearbeitung') return { color: '#eab308', text: 'Wird momentan repariert', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' };
    if (status === 'Ersatzteile bestellt') return { color: '#f97316', text: 'Warten auf Materialieferung', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' };
    if (status === 'Abholbereit') return { color: '#22c55e', text: 'Ihr Fahrrad ist abholbereit!', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' };
    if (status === 'Abgeschlossen' || status === 'Fahrrad abgeholt') return { color: '#64748b', text: 'Fahrrad erfolgreich abgeholt', icon: 'M5 13l4 4L19 7' };
    return { color: '#64748b', text: 'Unbekannter Status', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' };
  }
  
  $: resultInfo = form?.ticketInfo ? getStatusInfo(form.ticketInfo.status) : null;
  
  let currentCustomerTab = 'status'; // 'status' | 'chat' | 'details'
</script>

<svelte:head>
  <title>Status-Abfrage | Fahrradschrauber Mülheim-Heimaterde</title>
</svelte:head>

<section class="status-page">
  <div class="page-header">
    <div class="container">
      <h1>Wo ist mein Rad?</h1>
      <p>Überprüfen Sie den Live-Status Ihrer Fahrradreparatur in Sekunden.</p>
    </div>
  </div>

  <div class="container main-content">
    <div class="status-card">
      <div class="search-section">
        <form method="POST" action="?/search" use:enhance class="search-form">
          <label for="ticketId">Ihre 6-stellige Ticket-ID:</label>
          <div class="input-group">
            <input type="text" id="ticketId" name="ticketId" placeholder="z.B. X5Z8K2" required autocomplete="off" autocorrect="off" autocapitalize="characters" class="ticket-input">
            <button type="submit" class="btn btn-primary search-btn">Status prüfen</button>
          </div>
          {#if form?.error}
            <div class="error-msg">{form.error}</div>
          {/if}
        </form>
      </div>

      {#if form?.success && form?.ticketInfo && resultInfo}
        <div class="result-section animate-in">
          
          <div class="customer-tabs">
            <button class="customer-tab {currentCustomerTab === 'status' ? 'active-tab' : ''}" on:click={() => currentCustomerTab = 'status'}>
              📍 Status
            </button>
            <button class="customer-tab {currentCustomerTab === 'chat' ? 'active-tab' : ''}" on:click={() => currentCustomerTab = 'chat'}>
              💬 Nachrichten
              {#if form.ticketInfo.messages && form.ticketInfo.messages.length > 0 && form.ticketInfo.messages[form.ticketInfo.messages.length - 1].sender === 'Werkstatt'}
                <span class="unread-dot"></span>
              {/if}
            </button>
            <button class="customer-tab {currentCustomerTab === 'details' ? 'active-tab' : ''}" on:click={() => currentCustomerTab = 'details'}>
              🚲 Fahrrad
            </button>
          </div>

          <div class="tab-content">
            {#if currentCustomerTab === 'status'}
              {@const steps = ['Neu', 'In Bearbeitung', 'Abholbereit']}
              {@const currentStepIndex = form.ticketInfo.status === 'Neu' ? 0 : 
                                        (form.ticketInfo.status === 'Abholbereit' || form.ticketInfo.status === 'Abgeschlossen' || form.ticketInfo.status === 'Fahrrad abgeholt') ? 2 : 1}
              <!-- Progress Bar -->
              <div class="progress-container">
                
                <div class="progress-track">
                  <div class="progress-fill" style="width: {currentStepIndex * 50}%"></div>
                </div>
                
                <div class="progress-steps">
                  {#each steps as step, i}
                    <div class="progress-step {i <= currentStepIndex ? 'active-step' : ''}">
                      <div class="step-dot">{i < currentStepIndex ? '✓' : (i === currentStepIndex ? '●' : '')}</div>
                      <span class="step-label">{step}</span>
                    </div>
                  {/each}
                </div>
              </div>

              <div class="status-badge" style="background-color: {resultInfo.color}15; border-color: {resultInfo.color};">
                <div class="status-icon" style="color: {resultInfo.color};">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" width="48" height="48">
                    <path stroke-linecap="round" stroke-linejoin="round" d="{resultInfo.icon}"></path>
                  </svg>
                </div>
                
                <div class="status-details">
                  <h3>{form.ticketInfo.status}</h3>
                  <p class="status-desc">{resultInfo.text}</p>
                </div>
              </div>
              
              {#if form.ticketInfo.status === 'Abholbereit' || form.ticketInfo.status === 'Fahrrad abgeholt' || form.ticketInfo.status === 'Abgeschlossen'}
                <div class="cx-grid">
                  <div class="ready-action cx-card" style="margin-top: 0;">
                    <h4 style="margin-bottom: 8px;">🚀 Schnell-Abholung</h4>
                    <p style="font-size: 0.9rem; margin-bottom: 12px; opacity: 0.9;">Zeigen Sie diesen QR-Code im Laden vor, um Ihr Rad sofort zu erhalten.</p>
                    <div style="background: white; padding: 12px; border-radius: 8px; display: inline-block; margin-bottom: 12px;">
                      <!-- Fake QR SVG -->
                      <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=TICKET:{form.ticketInfo.id}" alt="QR" width="120" height="120" />
                    </div>
                    <div style="font-size: 1.25rem; font-weight: bold; letter-spacing: 2px;">{form.ticketInfo.id}</div>
                  </div>

                  <div class="cx-flex-col">
                    <div class="receipt cx-card printable-receipt">
                      <div class="print-header" style="display: none; text-align: center; margin-bottom: 24px;">
                        <h2 style="margin: 0;">Fahrradschrauber Mülheim</h2>
                        <p style="margin: 4px 0; color: #666;">Kassenbeleg / Werkstatt-Info</p>
                      </div>
                      <h4 style="margin-bottom: 12px; border-bottom: 1px dashed var(--border-color); padding-bottom: 8px;" class="hide-print">🧾 Vorläufige Werkstatt-Info</h4>
                      
                      <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.9rem;">
                        <span>Ticket-ID:</span> <strong>{form.ticketInfo.id}</strong>
                      </div>
                      <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.9rem;">
                        <span>Datum:</span> <strong>{new Intl.DateTimeFormat('de-DE', {dateStyle: 'medium'}).format(new Date())}</strong>
                      </div>
                      <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.9rem;">
                        <span>Rad:</span> <strong>{form.ticketInfo.bikeType}</strong>
                      </div>
                      <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.9rem;">
                        <span>Leistung:</span> <strong>Werkstatt-Tarif</strong>
                      </div>
                      <div style="display: flex; justify-content: space-between; margin-top: 12px; padding-top: 8px; border-top: 1px dashed var(--border-color); font-weight: bold; font-size: 1.1rem;">
                        <span>Zahlbar vor Ort</span>
                        <span style="color: var(--color-primary);">In bar oder EC</span>
                      </div>

                      <div class="print-footer" style="display: none; text-align: center; margin-top: 32px; font-size: 0.8rem; color: #666;">
                        Vielen Dank für Ihren Besuch!<br>
                        Bei Fragen zur Rechnung kontaktieren Sie uns bitte direkt.
                      </div>

                      <button class="btn btn-outline hide-print" style="width: 100%; margin-top: 16px;" on:click={() => window.print()}>🖨️ Als PDF / Drucken</button>
                    </div>

                    {#if form.ticketInfo.status === 'Abholbereit'}
                    <div class="weather cx-card" style="background: linear-gradient(135deg, #38bdf8, #0ea5e9); color: white; border: none;">
                      <h4 style="margin-bottom: 4px; display: flex; align-items: center; gap: 8px;">☀️ Tolles Fahrradwetter!</h4>
                      <p style="font-size: 0.85rem; opacity: 0.9;">Die Bedingungen sind heute perfekt für die erste gemeinsame Fahrt auf dem frisch reparierten Rad.</p>
                      <a href="/kontakt" class="btn" style="background: rgba(255,255,255,0.2); border: none; padding: 6px 12px; margin-top: 12px; display: inline-block; font-size: 0.85rem; color: white;">Anfahrt & Öffnungszeiten</a>
                    </div>
                    {/if}
                  </div>
                </div>
              {/if}

            {:else if currentCustomerTab === 'chat'}
              <div class="chat-section">
                <h3>Direktnachrichten</h3>
                <p class="chat-desc">Haben Sie eine Zwischenfrage zu Ihrem Rad? Schreiben Sie der Werkstatt direkt hier!</p>
                
                <div class="customer-chat-history">
                  {#if !form.ticketInfo.messages || form.ticketInfo.messages.length === 0}
                    <div class="empty-chat">Noch keine Nachrichten gesendet.</div>
                  {:else}
                    {#each form.ticketInfo.messages as msg}
                      <div class="msg {msg.sender === 'Kunde' ? 'msg-customer' : 'msg-shop'}">
                        <strong>{msg.sender === 'Kunde' ? 'Sie' : 'Fahrradschrauber'}:</strong>
                        <p>{msg.text}</p>
                        <span class="time">{new Intl.DateTimeFormat('de-DE', {hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit'}).format(new Date(msg.timestamp))}</span>
                      </div>
                    {/each}
                  {/if}
                </div>

                <form method="POST" action="?/sendMessage" use:enhance class="chat-form">
                  <input type="hidden" name="ticketId" value="{form.ticketInfo.id}">
                  <textarea name="message" placeholder="Ihre Frage an die Mechaniker..." required rows="2" class="chat-input"></textarea>
                  <button type="submit" class="btn btn-primary chat-btn">Senden</button>
                </form>
              </div>

            {:else if currentCustomerTab === 'details'}
              <div class="digital-pass">
                <div class="pass-header">
                  <div class="pass-title">DIGITALER SERVICE-PASS</div>
                  <div class="pass-id">{form.ticketInfo.id}</div>
                </div>
                
                <div class="pass-body">
                  <div class="pass-row">
                    <div class="pass-field">
                      <span class="p-label">Fahrzeugtyp</span>
                      <span class="p-value">{form.ticketInfo.bikeType}</span>
                    </div>
                    <div class="pass-field">
                      <span class="p-label">Eingangsdatum</span>
                      <span class="p-value">{new Intl.DateTimeFormat('de-DE', {dateStyle: 'medium'}).format(new Date(form.ticketInfo.date))}</span>
                    </div>
                  </div>

                  <div class="pass-row">
                    <div class="pass-field" style="width: 100%;">
                      <span class="p-label">Gemeldetes Problem & Diagnose</span>
                      <div class="p-value-box">{form.ticketInfo.problem}</div>
                    </div>
                  </div>

                  <div class="pass-row">
                    <div class="pass-field">
                      <span class="p-label">Werkstatt-Filiale</span>
                      <span class="p-value">Mülheim-Heimaterde</span>
                    </div>
                    <div class="pass-field">
                      <span class="p-label">Beleg-Status</span>
                      <span class="p-value" style="color: var(--color-primary); font-weight: 700;">GÜLTIG</span>
                    </div>
                  </div>
                </div>
                
                <div class="pass-bg-watermark">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1" width="150" height="150">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-1.879l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"></path>
                  </svg>
                </div>
              </div>
            {/if}
          </div>
        </div>
      {/if}
    </div>
  </div>
</section>

<style>
  .status-page {
    min-height: calc(100vh - 80px);
    background: var(--color-bg-alt);
    padding-bottom: 80px;
  }

  .page-header {
    background: var(--color-primary);
    color: white;
    padding: 80px 0 60px;
    text-align: center;
    margin-bottom: -40px;
  }

  .page-header h1 {
    font-size: 2.5rem;
    margin-bottom: 16px;
  }

  .page-header p {
    font-size: 1.1rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
  }

  .main-content {
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 2;
  }

  .status-card {
    background: var(--color-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 48px;
    box-shadow: var(--shadow-lg);
    width: 100%;
    max-width: 700px;
    margin-top: 32px;
  }

  .search-section {
    max-width: 500px;
    margin: 0 auto;
  }

  .search-form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  label {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--color-text);
  }

  .input-group {
    display: flex;
    gap: 16px;
  }

  .ticket-input {
    flex: 1;
    padding: 16px;
    border: 2px solid var(--border-color);
    border-radius: var(--radius-md);
    font-family: inherit;
    font-size: 1.25rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    background: var(--color-bg-alt);
    color: var(--color-text);
    transition: all var(--transition);
  }

  .ticket-input:focus {
    outline: none;
    border-color: var(--color-primary);
    background: var(--color-bg);
  }

  .search-btn {
    padding: 16px 32px;
    white-space: nowrap;
  }

  .error-msg {
    color: #dc2626;
    background: #fef2f2;
    padding: 12px 16px;
    border-radius: var(--radius-md);
    font-size: 0.95rem;
    margin-top: 8px;
    border: 1px solid #fecaca;
  }

  .result-section {
    margin-top: 32px;
    padding-top: 32px;
    border-top: 1px dashed var(--border-color);
  }

  .customer-tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 24px;
    border-bottom: 2px solid var(--border-color);
    overflow-x: auto;
  }
  .customer-tab {
    padding: 12px 20px;
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--color-text-muted);
    background: transparent;
    border: none;
    cursor: pointer;
    border-bottom: 3px solid transparent;
    margin-bottom: -2px;
    transition: all 0.2s;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .customer-tab:hover { color: var(--color-text); }
  .customer-tab.active-tab { color: var(--color-primary); border-bottom-color: var(--color-primary); }
  
  .unread-dot {
    width: 10px;
    height: 10px;
    background-color: #ef4444;
    border-radius: 50%;
    display: inline-block;
  }
  
  .tab-content {
    min-height: 250px;
  }

  .status-badge {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 32px;
    border-radius: var(--radius-lg);
    border: 2px solid transparent;
    margin-bottom: 32px;
  }

  .status-details h3 {
    font-size: 2rem;
    margin-bottom: 8px;
    line-height: 1.1;
  }

  .status-desc {
    font-size: 1.1rem;
    opacity: 0.8;
  }

  /* Progress Timeline */
  .progress-container {
    margin: 32px 0 48px;
    position: relative;
    padding: 0 20px;
  }
  .progress-track {
    position: absolute;
    top: 15px;
    left: 40px;
    right: 40px;
    height: 4px;
    background: var(--border-color);
    z-index: 1;
  }
  .progress-fill {
    height: 100%;
    background: var(--color-primary);
    transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .progress-steps {
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 2;
  }
  .progress-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    color: var(--color-text-muted);
  }
  .progress-step.active-step {
    color: var(--color-primary);
    font-weight: 600;
  }
  .step-dot {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: var(--color-bg);
    border: 3px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
    transition: all 0.3s;
  }
  .active-step .step-dot {
    border-color: var(--color-primary);
    background: var(--color-primary);
    color: white;
  }
  .step-label {
    font-size: 0.85rem;
    text-align: center;
    max-width: 100px;
  }

  /* CX Upgrades */
  .cx-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-top: 24px;
  }
  .cx-flex-col {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .cx-card {
    background: var(--color-bg-alt);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: 24px;
  }
  
  /* Digital Pass UI */
  .digital-pass {
    background: linear-gradient(145deg, #ffffff, #f8fafc);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  }
  .pass-header {
    background: var(--color-text);
    color: white;
    padding: 16px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .pass-title {
    font-size: 0.85rem;
    letter-spacing: 3px;
    opacity: 0.9;
  }
  .pass-id {
    font-family: monospace;
    font-size: 1.25rem;
    font-weight: bold;
    letter-spacing: 2px;
    background: rgba(255,255,255,0.1);
    padding: 4px 12px;
    border-radius: 6px;
  }
  .pass-body {
    padding: 24px;
    position: relative;
    z-index: 2;
  }
  .pass-row {
    display: flex;
    gap: 24px;
    margin-bottom: 24px;
  }
  .pass-row:last-child {
    margin-bottom: 0;
  }
  .pass-field {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .p-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    color: var(--color-text-muted);
    font-weight: 600;
  }
  .p-value {
    font-size: 1.1rem;
    color: var(--color-text);
    font-weight: 500;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 4px;
  }
  .p-value-box {
    background: var(--color-bg);
    border: 1px dashed var(--border-color);
    padding: 12px;
    border-radius: 8px;
    font-size: 1rem;
    line-height: 1.5;
    color: var(--color-text);
    white-space: pre-wrap;
  }
  .pass-bg-watermark {
    position: absolute;
    bottom: -20px;
    right: -20px;
    opacity: 0.03;
    z-index: 1;
    transform: rotate(-15deg);
    pointer-events: none;
  }

  /* Print Media Query */
  @media print {
    body * {
      visibility: hidden;
    }
    .printable-receipt, .printable-receipt * {
      visibility: visible;
    }
    .printable-receipt {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      border: none !important;
      box-shadow: none !important;
      background: white !important;
      padding: 0 !important;
    }
    .hide-print {
      display: none !important;
    }
    .print-header, .print-footer {
      display: block !important;
    }
  }

  .ready-action {
    background: #f0fdf4;
    border-color: #bbf7d0;
    color: #166534;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .bike-info {
    animation: slideUp 0.4s ease-out forwards;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .chat-section {
    margin-top: 0;
    padding-top: 0;
    border-top: none;
  }

  .chat-section h3 {
    font-size: 1.25rem;
    margin-bottom: 4px;
    color: var(--color-text);
  }

  .chat-desc {
    font-size: 0.95rem;
    color: var(--color-text-muted);
    margin-bottom: 24px;
  }

  .customer-chat-history {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
    height: 400px;
    max-height: 60vh;
    overflow-y: auto;
    padding-right: 8px;
  }

  .empty-chat {
    text-align: center;
    padding: 24px;
    background: var(--color-bg-alt);
    border-radius: var(--radius-md);
    color: var(--color-text-muted);
    font-size: 0.95rem;
  }

  .msg {
    padding: 12px 16px;
    border-radius: 12px;
    max-width: 85%;
    position: relative;
  }

  .msg-customer {
    background: var(--color-bg-alt);
    color: var(--color-text);
    align-self: flex-end;
    border-bottom-right-radius: 4px;
  }

  .msg-shop {
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    color: #1e3a8a;
    align-self: flex-start;
    border-bottom-left-radius: 4px;
  }

  .msg strong {
    display: block;
    font-size: 0.8rem;
    margin-bottom: 4px;
    opacity: 0.7;
  }

  .msg p {
    margin: 0;
    line-height: 1.4;
  }

  .msg .time {
    display: block;
    font-size: 0.7rem;
    margin-top: 6px;
    opacity: 0.5;
    text-align: right;
  }

  .chat-form {
    display: flex;
    gap: 12px;
    align-items: flex-end;
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

  .chat-btn {
    padding: 12px 24px;
    height: 100%;
  }

  @media (max-width: 640px) {
    .chat-form {
      flex-direction: column;
      align-items: stretch;
    }
    
    .input-group {
      flex-direction: column;
    }
    
    .status-badge {
      flex-direction: column;
      text-align: center;
      padding: 24px;
    }
    
    .status-card {
      padding: 32px 24px;
    }

    .cx-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
