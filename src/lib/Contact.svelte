<script>
  let showMapOptions = false;

  function toggleMapOptions(e) {
    if (e) e.preventDefault();
    showMapOptions = !showMapOptions;
  }
</script>

<section id="contact" class="contact">
  <div class="container">
    <div class="contact-wrapper">
      <div class="contact-info">
        <h2 class="title">Hier finden Sie uns</h2>
        <p class="subtitle">Kommen Sie mit Ihrem Rad direkt bei uns vorbei oder vereinbaren Sie vorab einen Termin.</p>
        
        <div class="info-list">
          <div class="address-wrapper">
            <a href="#" on:click={toggleMapOptions} class="info-item hover-link">
              <div class="icon-box">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <div>
                <h4 class="info-label">Adresse</h4>
                <p class="info-value hover-text">Ludwig-Bender-Straße 53<br>45472 Mülheim an der Ruhr</p>
              </div>
            </a>
            
            {#if showMapOptions}
              <div class="map-options">
                <p class="map-options-title">Route starten mit:</p>
                <div class="map-buttons">
                  <a href="https://maps.google.com/?q=Ludwig-Bender-Straße+53,+45472+Mülheim+an+der+Ruhr" target="_blank" rel="noopener noreferrer" class="map-btn">Google Maps</a>
                  <a href="https://maps.apple.com/?q=Ludwig-Bender-Straße+53,+45472+Mülheim+an+der+Ruhr" target="_blank" rel="noopener noreferrer" class="map-btn">Apple Maps</a>
                </div>
              </div>
            {/if}
          </div>
          
          <div class="info-item">
            <div class="icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <div>
              <h4 class="info-label">Öffnungszeiten</h4>
              <p class="info-value">Mo-Do: 17:00 - 20:00 Uhr<br>Fr: 16:00 - 20:00 Uhr<br>Sa: 11:00 - 16:00 Uhr</p>
            </div>
          </div>
          
          <a href="tel:+491626418118" class="info-item hover-link">
            <div class="icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <div>
              <h4 class="info-label">Kontakt</h4>
              <p class="info-value hover-text">Tel: +49 162 6418118</p>
            </div>
          </a>
        </div>
      </div>
      
      <div class="map-card">
        <iframe
          title="Fahrradschrauber Mülheim-Heimaterde Karte"
          src="https://maps.google.com/maps?q=Fahrradschrauber+M%C3%BClheim-Heimaterde&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style="border:0;"
          allowfullscreen
          loading="lazy">
        </iframe>
      </div>
    </div>
  </div>
</section>

<style>
  .contact {
    padding: 100px 0;
    background: var(--color-bg);
  }

  .contact-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: center;
  }

  .title {
    font-size: 2rem;
    margin-bottom: 16px;
    color: var(--color-text);
  }

  .subtitle {
    color: var(--color-text-muted);
    font-size: 1.05rem;
    margin-bottom: 48px;
    max-width: 480px;
  }

  .info-list {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .address-wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .map-options {
    margin-left: 56px;
    background: var(--color-bg-alt);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: 16px;
    animation: fadeIn 0.3s ease-out forwards;
  }

  .map-options-title {
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 12px;
    color: var(--color-text-muted);
  }

  .map-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .map-btn {
    font-size: 0.85rem;
    padding: 6px 12px;
    text-decoration: none;
    border-radius: 6px;
    background: var(--color-bg);
    border: 1px solid var(--border-color);
    color: var(--color-text);
    transition: all var(--transition);
  }

  .map-btn:hover {
    background: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
    transform: translateY(-2px);
  }

  .info-item {
    display: flex;
    gap: 16px;
    align-items: flex-start;
  }

  .hover-link {
    cursor: pointer;
    text-decoration: none;
    transition: transform var(--transition);
    color: inherit;
  }

  .hover-link:hover {
    transform: translateX(4px);
  }

  .hover-link:hover .icon-box {
    background: var(--color-primary);
    color: white;
  }

  .hover-link:hover .hover-text {
    color: var(--color-primary);
  }

  .icon-box {
    width: 40px;
    height: 40px;
    background: var(--color-bg-alt);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-primary);
    flex-shrink: 0;
    transition: all var(--transition);
  }

  .info-label {
    font-size: 1rem;
    margin-bottom: 4px;
    font-weight: 600;
    color: var(--color-text);
  }

  .info-value {
    color: var(--color-text-muted);
    line-height: 1.6;
    font-size: 0.95rem;
    transition: color var(--transition);
  }

  .map-card {
    background: var(--color-bg-alt);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    overflow: hidden;
    height: 400px;
    width: 100%;
    box-shadow: var(--shadow-sm);
  }

  @media (max-width: 992px) {
    .contact-wrapper {
      grid-template-columns: 1fr;
      gap: 48px;
    }
    
    .map-card {
      height: 350px;
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>
