<script>
  // List of common services
  const services = [
    { id: 'reifenwechsel', name: 'Reifen & Schlauch (pro Reifen)', minPrice: 25, maxPrice: 45 },
    { id: 'schlauch', name: 'Nur Schlauch wechseln', minPrice: 15, maxPrice: 20 },
    { id: 'bremsen', name: 'Bremsen einstellen / entlüften', minPrice: 20, maxPrice: 50 },
    { id: 'schaltung', name: 'Schaltung einstellen', minPrice: 15, maxPrice: 30 },
    { id: 'kette', name: 'Kette wechseln & Antrieb reinigen', minPrice: 25, maxPrice: 45 },
    { id: 'kurbel', name: 'Kurbel wechseln', minPrice: 30, maxPrice: 55 }
  ];

  let selectedServices = [];

  $: totalMin = selectedServices.reduce((sum, s) => sum + s.minPrice, 0);
  $: totalMax = selectedServices.reduce((sum, s) => sum + s.maxPrice, 0);

  function toggleService(service) {
    if (selectedServices.find(s => s.id === service.id)) {
      selectedServices = selectedServices.filter(s => s.id !== service.id);
    } else {
      selectedServices = [...selectedServices, service];
    }
  }
</script>

<div class="calculator-wrapper animate-fade-in-up delay-200">
  <div class="calculator-header">
    <h3>Interaktiver Preisrechner</h3>
    <p>Wählen Sie Ihre gewünschten Reparaturen für eine grobe Kosteneinschätzung (zzgl. Material).</p>
  </div>

  <div class="services-grid">
    {#each services as service}
      <button 
        class="service-btn {selectedServices.find(s => s.id === service.id) ? 'selected' : ''}"
        on:click={() => toggleService(service)}
      >
        <span class="service-name">{service.name}</span>
        <span class="service-price">ab {service.minPrice}€</span>
        <div class="check-indicator">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
      </button>
    {/each}
  </div>

  <div class="calculator-footer">
    <div class="total-display">
      <span class="total-label">Geschätzte Arbeitskosten:</span>
      {#if selectedServices.length === 0}
        <strong class="total-value">0 €</strong>
      {:else}
        <strong class="total-value highlight">{totalMin} € - {totalMax} €</strong>
      {/if}
    </div>
    <a href="/termin" class="btn btn-primary">Termin anfragen</a>
  </div>
</div>

<style>
  .calculator-wrapper {
    background: var(--color-bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-md);
    max-width: 800px;
    margin: 48px auto;
  }

  .calculator-header {
    padding: 32px 32px 24px;
    border-bottom: 1px solid var(--border-color);
    text-align: center;
  }

  .calculator-header h3 {
    font-size: 1.8rem;
    color: var(--color-text);
    margin-bottom: 8px;
  }

  .calculator-header p {
    color: var(--color-text-muted);
    font-size: 1rem;
  }

  .services-grid {
    padding: 32px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
    background: var(--color-bg-alt);
  }

  .service-btn {
    background: var(--color-bg);
    border: 2px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    cursor: pointer;
    position: relative;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    color: var(--color-text);
  }

  .service-btn:hover {
    border-color: var(--color-text-muted);
    transform: translateY(-2px);
  }

  .service-btn.selected {
    border-color: var(--color-primary);
    background: rgba(249, 115, 22, 0.05); /* very soft orange */
    box-shadow: 0 0 0 1px var(--color-primary) inset, var(--shadow-sm);
  }

  .service-name {
    font-weight: 600;
    font-size: 1.05rem;
    margin-bottom: 4px;
    padding-right: 24px;
  }

  .service-price {
    font-size: 0.9rem;
    color: var(--color-text-muted);
  }

  .service-btn.selected .service-price {
    color: var(--color-primary);
    font-weight: 500;
  }

  .check-indicator {
    position: absolute;
    top: 20px;
    right: 20px;
    opacity: 0;
    transform: scale(0.5);
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    color: var(--color-primary);
  }

  .service-btn.selected .check-indicator {
    opacity: 1;
    transform: scale(1);
  }

  .calculator-footer {
    padding: 24px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--color-bg-card);
    border-top: 1px solid var(--border-color);
    flex-wrap: wrap;
    gap: 16px;
  }

  .total-display {
    display: flex;
    flex-direction: column;
  }

  .total-label {
    font-size: 0.9rem;
    color: var(--color-text-muted);
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  .total-value {
    font-size: 2rem;
    font-weight: 800;
    color: var(--color-text);
  }

  .total-value.highlight {
    color: var(--color-primary);
  }

  @media (max-width: 640px) {
    .calculator-footer {
      flex-direction: column;
      align-items: stretch;
      text-align: center;
    }
    
    .services-grid {
      padding: 16px;
      grid-template-columns: 1fr;
    }
    
    .service-btn {
      padding: 16px;
    }
  }
</style>
