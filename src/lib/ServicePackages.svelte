<script>
  const packages = [
    {
      name: "Basis Check",
      price: "ab 39€",
      desc: "Die schnelle Durchsicht für Vielfahrer.",
      features: [
        "Schaltung prüfen & einstellen",
        "Bremsenkontrolle & Justierung",
        "Reifendruck & Profil checken",
        "Kette ölen",
        "Schrauben nachziehen"
      ],
      highlight: false
    },
    {
      name: "Premium Inspektion",
      price: "ab 79€",
      desc: "Das Rundum-Sorglos Paket für dein Rad.",
      features: [
        "Alles aus dem Basis Check",
        "Laufräder zentrieren",
        "Tretlager & Steuersatz prüfen",
        "Verschleißteile-Analyse",
        "Intensive Probefahrt"
      ],
      highlight: true
    },
    {
      name: "E-Bike Service",
      price: "ab 99€",
      desc: "Spezial-Service für Pedelecs & E-Bikes.",
      features: [
        "Alles aus der Premium Inspektion",
        "Software-Update (Bosch, Shimano)",
        "Akku-Kapazitätsprüfung",
        "Motor-Diagnose & Fehlerprotokoll",
        "Elektronik-Kontakte reinigen"
      ],
      highlight: false
    }
  ];
</script>

<section class="packages-section" id="preise">
  <div class="container">
    <div class="section-header">
      <h2>Transparente Service-Pakete</h2>
      <p>Wähle das passende Paket für dein Fahrrad. Keine versteckten Kosten – wir besprechen alles transparent vor Ort.</p>
    </div>

    <div class="packages-grid">
      {#each packages as pkg}
        <div class="package-card {pkg.highlight ? 'highlight-card' : ''}">
          {#if pkg.highlight}
            <div class="popular-badge">Am Beliebtesten</div>
          {/if}
          <div class="card-header">
            <h3>{pkg.name}</h3>
            <div class="price">{pkg.price}</div>
            <p class="desc">{pkg.desc}</p>
          </div>
          <div class="card-body">
            <ul class="features">
              {#each pkg.features as feature}
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check-icon"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  {feature}
                </li>
              {/each}
            </ul>
          </div>
          <div class="card-footer">
            <a href="/termin" class="btn {pkg.highlight ? 'btn-primary' : 'btn-outline'}" style="width: 100%;">Termin buchen</a>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .packages-section {
    padding: 100px 0;
    background: var(--color-bg-alt);
    position: relative;
  }

  .packages-section::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
  }

  .section-header {
    text-align: center;
    margin-bottom: 60px;
  }

  .section-header h2 {
    font-size: 2.5rem;
    margin-bottom: 16px;
    background: linear-gradient(to right, #fff, var(--color-text-muted));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .section-header p {
    color: var(--color-text-muted);
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto;
  }

  .packages-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 32px;
    align-items: center; /* helps highlight card pop out */
  }

  .package-card {
    background: var(--color-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 40px;
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    transition: transform 0.3s ease, border-color 0.3s ease;
  }

  .package-card:hover {
    transform: translateY(-5px);
    border-color: rgba(255,255,255,0.15);
  }

  .highlight-card {
    border-color: var(--color-primary);
    box-shadow: 0 0 30px rgba(249, 115, 22, 0.15);
    background: linear-gradient(180deg, rgba(26,26,26,1) 0%, rgba(20,20,20,1) 100%);
    transform: scale(1.05); /* slightly bigger */
    z-index: 10;
  }

  .highlight-card:hover {
    transform: scale(1.05) translateY(-5px);
    border-color: var(--color-primary);
  }

  .popular-badge {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--color-primary);
    color: white;
    font-size: 0.8rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 6px 16px;
    border-radius: 99px;
  }

  .card-header {
    margin-bottom: 32px;
    text-align: center;
    padding-bottom: 32px;
    border-bottom: 1px solid var(--border-color);
  }

  .card-header h3 {
    font-size: 1.5rem;
    margin-bottom: 12px;
    font-weight: 600;
  }

  .price {
    font-size: 2.5rem;
    font-weight: 800;
    color: white;
    margin-bottom: 12px;
  }

  .desc {
    color: var(--color-text-muted);
    font-size: 0.95rem;
  }

  .card-body {
    flex-grow: 1;
    margin-bottom: 40px;
  }

  .features {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .features li {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    color: var(--color-text);
    font-size: 1rem;
  }

  .check-icon {
    color: var(--color-primary);
    flex-shrink: 0;
  }

  .btn {
    padding: 14px 24px;
    border-radius: var(--radius-md);
    font-weight: 600;
    text-align: center;
    text-decoration: none;
    transition: all 0.2s;
    display: inline-block;
  }

  @media (max-width: 900px) {
    .highlight-card {
      transform: none;
    }
    .highlight-card:hover {
      transform: translateY(-5px);
    }
  }
</style>
