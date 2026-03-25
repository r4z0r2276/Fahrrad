<script>
  let faqs = [
    {
      q: "Wie lange dauert eine Reparatur in der Regel?",
      a: "In den meisten Fällen ist Ihr Fahrrad innerhalb von 1 bis 3 Werktagen wieder einsatzbereit. Sollten spezielle Ersatzteile bestellt werden müssen, informieren wir Sie umgehend über die Lieferzeit.",
      open: false
    },
    {
      q: "Bekomme ich vorher einen Preis-Voranschlag?",
      a: "Absolut! Nach der Annahme machen wir einen kurzen Check und teilen Ihnen die ungefähren Reparaturkosten mit. Wir tauschen keine teuren Teile ohne Ihre ausdrückliche Zustimmung aus.",
      open: false
    },
    {
      q: "Reparieren Sie auch E-Bikes?",
      a: "Ja, wir übernehmen sämtliche mechanischen Reparaturen (Bremsen, Kette, Reifen, Schaltung) an E-Bikes aller gängigen Marken. Bitte beachten Sie: Wir führen keine tiefgreifenden Motor- oder Batterie-Diagnosen durch.",
      open: false
    },
    {
      q: "Muss ich vorher einen Termin machen?",
      a: "Um lange Wartezeiten zu vermeiden, empfehlen wir immer unsere kostenlose Online-Terminanfrage. Bei akuten Pannen (z.B. platter Reifen) können Sie natürlich auch während der Öffnungszeiten spontan vorbeikommen.",
      open: false
    }
  ];

  function toggle(index) {
    faqs[index].open = !faqs[index].open;
    faqs = [...faqs];
  }
</script>

<section class="faq-section">
  <div class="container">
    <div class="faq-header animate-fade-in-up">
      <h2>Häufig gestellte Fragen (FAQ)</h2>
      <p>Alles was Sie vor Ihrem Besuch in der Heimaterde-Werkstatt wissen müssen.</p>
    </div>

    <div class="faq-grid animate-fade-in-up delay-200">
      {#each faqs as faq, i}
        <div class="faq-card {faq.open ? 'open' : ''}">
          <button class="faq-question" on:click={() => toggle(i)}>
            <h3>{faq.q}</h3>
            <div class="icon {faq.open ? 'rotated' : ''}">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </button>
          {#if faq.open}
            <div class="faq-answer">
              <p>{faq.a}</p>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .faq-section {
    padding: 100px 0;
    background: var(--color-bg);
  }

  .faq-header {
    text-align: center;
    margin-bottom: 64px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .faq-header h2 {
    font-size: 2.2rem;
    margin-bottom: 16px;
    color: var(--color-text);
  }

  .faq-header p {
    font-size: 1.1rem;
    color: var(--color-text-muted);
  }

  .faq-grid {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .faq-card {
    background: var(--color-bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .faq-card.open {
    border-color: var(--color-primary);
    box-shadow: var(--shadow-md);
  }

  .faq-question {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    background: transparent;
    border: none;
    cursor: pointer;
    text-align: left;
    color: var(--color-text);
  }

  .faq-question h3 {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
  }

  .icon {
    color: var(--color-primary);
    transition: transform 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-bg-alt);
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .icon.rotated {
    transform: rotate(180deg);
    background: var(--color-primary);
    color: white;
  }

  .faq-answer {
    padding: 0 24px 24px;
    color: var(--color-text-muted);
    font-size: 1rem;
    line-height: 1.6;
    animation: expand 0.3s ease-out forwards;
  }

  @keyframes expand {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 640px) {
    .faq-section {
      padding: 60px 0;
    }
    
    .faq-header h2 {
      font-size: 1.8rem;
    }
    
    .faq-question {
      padding: 20px 16px;
    }
    
    .faq-answer {
      padding: 0 16px 20px;
    }
  }
</style>
