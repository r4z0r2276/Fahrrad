<script>
  const services = [
    {
      title: 'Inspektion & Wartung',
      desc: 'Regelmäßige Checks für deine Sicherheit. Alles wird professionell geprüft und eingestellt.',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    },
    {
      title: 'Reparatur',
      desc: 'Von platten Reifen bis zu gerissenen Ketten – schnelle und zuverlässige Behebung aller Mängel.',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    },
    {
      title: 'Urlaubs- & Saison-Check',
      desc: 'Umfassende Prüfung aller wichtigen Bauteile, damit du auf der nächsten Tour verschleißfrei und sicher unterwegs bist.',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    }
  ];
</script>

<section id="services" class="services">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">Unsere Leistungen</h2>
      <p class="section-subtitle">Wir bieten einen umfassenden Rundum-Service, damit dein Fahrrad immer perfekt läuft.</p>
    </div>

    <div class="grid">
      {#each services as service}
        <div class="card">
          <div class="card-icon">
            {@html service.icon}
          </div>
          <h3 class="card-title">{service.title}</h3>
          <p class="card-desc">{service.desc}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .services {
    padding: 100px 0;
    background: var(--color-bg-alt);
  }

  .section-header {
    text-align: center;
    margin-bottom: 64px;
    max-width: 600px;
    margin-inline: auto;
  }

  .section-title {
    font-size: 2.2rem;
    margin-bottom: 16px;
    color: var(--color-text);
  }

  .section-subtitle {
    color: var(--color-text-muted);
    font-size: 1.05rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 32px;
  }

  .card {
    background: var(--color-bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 32px;
    transition: all var(--transition);
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
    border-color: #cbd5e1;
  }

  .card-icon {
    width: 48px;
    height: 48px;
    background: var(--color-bg-alt);
    color: var(--color-primary);
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
    border: 1px solid var(--border-color);
  }

  .card-title {
    font-size: 1.2rem;
    margin-bottom: 12px;
    color: var(--color-text);
  }

  .card-desc {
    color: var(--color-text-muted);
    font-size: 0.95rem;
    line-height: 1.6;
  }
</style>
