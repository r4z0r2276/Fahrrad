<script>
  export let data; // Passed from SvelteKit load function
  export let form; // Passed from SvelteKit actions

  $: isVacationMode = data.settingsStatus === 'Urlaubsmodus (Keine neuen Termine)';
  $: isBusyMode = data.settingsStatus === 'Ausgebucht (Warteschlange)';
</script>

<svelte:head>
  <title>Termin buchen | Fahrradschrauber Mülheim-Heimaterde</title>
</svelte:head>

<section class="booking-page">
  <div class="page-header">
    <div class="container">
      <h1>Werkstatt-Termin anfragen</h1>
      <p>Beschreiben Sie uns Ihr Problem und wir melden uns bei Ihnen zwecks Terminvereinbarung.</p>
    </div>
  </div>

  <div class="container main-content">
    <div class="booking-wrapper">
      
      <!-- Booking Form -->
      <div class="booking-card">
        {#if isVacationMode}
          <div class="success-state" style="padding: 16px 0;">
            <div class="check-icon" style="background: rgba(220, 38, 38, 0.1); color: #dc2626;">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            </div>
            <h2>Wir haben aktuell geschlossen!</h2>
            <p>Die Werkstatt befindet sich momentan im <strong>Urlaubsmodus</strong>. Wir können daher vorübergehend leider keine neuen Aufträge annehmen.</p>
            <p style="margin-top: 16px; font-size: 0.95rem;">Vielen Dank für Ihr Verständnis. Schauen Sie gerne in ein paar Tagen wieder vorbei!</p>
            <a href="/" class="btn btn-outline" style="margin-top: 32px;">Zurück zur Startseite</a>
          </div>
        {:else if form?.success}
          <div class="success-state">
            <div class="check-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <h2>Anfrage erfolgreich gesendet!</h2>
            <p>Wir haben Ihre Anfrage erhalten. Ein Mitarbeiter wird den Auftrag sichten und sich in Kürze telefonisch bei Ihnen melden.</p>
            
            <div class="tracking-box">
              <p>Ihre persönliche Ticket-ID lautet:</p>
              <strong class="ticket-id">{form.trackingId}</strong>
              <p class="small-text">Mit dieser ID können Sie jederzeit den Bearbeitungsstatus Ihres Fahrrads online prüfen!</p>
            </div>

            <a href="/" class="btn btn-primary" style="margin-top: 24px;">Zurück zur Startseite</a>
          </div>
        {:else}
          {#if isBusyMode}
            <div class="busy-alert" style="background: rgba(234, 179, 8, 0.1); border: 1px solid rgba(234, 179, 8, 0.3); padding:16px; border-radius:8px; margin-bottom:24px; display:flex; gap:12px; align-items:flex-start;">
              <div style="color: #eab308; margin-top: 2px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              </div>
              <div>
                <strong style="color: #fef08a; display:block; margin-bottom:4px;">Hohes Arbeitsaufkommen</strong>
                <p style="color: #fde047; font-size:0.9rem; margin:0; line-height:1.4;">Wir sind derzeit stark ausgebucht. Sie können Ihre Anfrage gerne stellen und sich auf die <strong>Warteschliste</strong> setzen lassen, jedoch kann die Bearbeitung deutlich länger dauern als gewohnt.</p>
              </div>
            </div>
          {/if}

          <form method="POST" action="?/book" class="booking-form">
            <div class="form-row">
              <div class="form-group">
                <label for="name">Vor- und Nachname</label>
                <input type="text" id="name" name="name" required placeholder="Geben Sie Ihren Namen ein">
              </div>
              <div class="form-group">
                <label for="phone">Telefonnummer</label>
                <input type="tel" id="phone" name="phone" required placeholder="Für Rückfragen (z.B. 0170 1234567)">
              </div>
            </div>

            <div class="form-group">
              <label for="bikeType">Um welches Fahrrad handelt es sich?</label>
              <select id="bikeType" name="bikeType" required>
                <option value="" disabled selected>Bitte wählen</option>
                <option value="Citybike / Hollandrad">Citybike / Hollandrad</option>
                <option value="Mountainbike">Mountainbike</option>
                <option value="Rennrad">Rennrad</option>
                <option value="Kinderfahrrad">Kinderfahrrad</option>
                <option value="Trekkingrad">Trekkingrad</option>
                <option value="E-Bike (nur Mechanik)">E-Bike (nur Mechanik)</option>
                <option value="Sonstiges">Sonstiges</option>
              </select>
            </div>

            <div class="form-group">
              <label for="problem">Was soll gemacht werden?</label>
              <textarea id="problem" name="problem" rows="4" required placeholder="Beispiel: Große Inspektion, Schlauch hinten wechseln, oder Schaltung knackt..."></textarea>
            </div>
            
            {#if form?.error}
              <div class="error-msg">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                <span>{form.error}</span>
              </div>
            {/if}

            <div class="form-actions">
              <p class="form-hint">Es ist keine verbindliche Buchung. Wir kontaktieren Sie zur endgültigen Terminbestätigung.</p>
              <button type="submit" class="btn btn-primary submit-btn">Anfrage absenden</button>
            </div>
          </form>
        {/if}
      </div>
      
    </div>
  </div>
</section>

<style>
  .booking-page {
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

  .booking-wrapper {
    width: 100%;
    max-width: 800px;
    margin: 32px auto 0;
  }

  .booking-card {
    background: var(--color-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 48px;
    box-shadow: var(--shadow-lg);
    width: 100%;
  }

  .success-state {
    text-align: center;
    padding: 32px 0;
  }

  .check-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    background: rgba(16, 185, 129, 0.1);
    color: #059669;
    border-radius: 50%;
    margin-bottom: 24px;
  }

  .success-state h2 {
    font-size: 2rem;
    margin-bottom: 16px;
    color: var(--color-text);
  }

  .success-state p {
    color: var(--color-text-muted);
    font-size: 1.1rem;
    line-height: 1.6;
    max-width: 500px;
    margin: 0 auto;
  }

  .tracking-box {
    margin: 32px auto;
    background: var(--color-bg-alt);
    border: 2px dashed var(--border-color);
    border-radius: var(--radius-lg);
    padding: 24px;
    max-width: 400px;
  }

  .ticket-id {
    display: block;
    font-size: 2.5rem;
    letter-spacing: 4px;
    color: var(--color-primary);
    margin: 12px 0;
  }

  .small-text {
    font-size: 0.85rem !important;
  }

  .booking-form {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  label {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--color-text);
  }

  input, select, textarea {
    width: 100%;
    padding: 14px 16px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    font-family: inherit;
    font-size: 1rem;
    background: var(--color-bg-alt);
    color: var(--color-text);
    transition: all var(--transition);
  }

  input:focus, select:focus, textarea:focus {
    outline: none;
    background: var(--color-bg);
    border-color: var(--color-primary);
    box-shadow: 0 0 0 4px rgba(15, 23, 42, 0.05);
  }

  textarea {
    resize: vertical;
  }

  .form-actions {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    border-top: 1px solid var(--border-color);
    padding-top: 32px;
  }

  .submit-btn {
    width: 100%;
    padding: 16px;
    font-size: 1.05rem;
  }

  .form-hint {
    font-size: 0.85rem;
    color: var(--color-text-muted);
    text-align: center;
    margin-bottom: 16px;
  }

  .error-msg {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #dc2626;
    background: rgba(220, 38, 38, 0.1);
    padding: 16px;
    border-radius: var(--radius-md);
    border: 1px solid #fecaca;
  }

  @media (max-width: 768px) {
    .page-header {
      padding: 60px 20px 40px;
    }
    
    .booking-card {
      padding: 32px 24px;
    }

    .form-row {
      grid-template-columns: 1fr;
    }
  }
</style>
