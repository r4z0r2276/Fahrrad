<script>
  // Clean hero without blobs
</script>

<section class="hero" id="home">
  <div class="container hero-content">
    <span class="badge animate-fade-in-up">Ihre Fahrradwerkstatt in Mülheim</span>
    <h1 class="title animate-fade-in-up delay-100">
      Ihr Fahrrad in besten Händen.
    </h1>
    <p class="subtitle animate-fade-in-up delay-200">
      Fachgerechte Reparatur, Inspektion und Wartung für alle Fahrradtypen in Heimaterde. Schnell, zuverlässig und transparent.
    </p>
    <div class="cta-group animate-fade-in-up delay-300">
      <a href="#contact" class="btn btn-primary">Termin vereinbaren</a>
      <a href="#services" class="btn btn-outline">Unsere Leistungen</a>
    </div>

    <div class="stats delay-300 animate-fade-in-up">
      <div class="stat-item">
        <span class="stat-value">Erfahren</span>
        <span class="stat-label">Top Qualität</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">Lokal</span>
        <span class="stat-label">In Mülheim</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">Schnell</span>
        <span class="stat-label">Zuverlässig</span>
      </div>
    </div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    padding: 180px 0 100px;
    background: var(--color-bg);
  }

  .badge {
    display: inline-block;
    padding: 6px 14px;
    background: var(--color-bg-alt);
    color: var(--color-text-muted);
    border-radius: var(--radius-full);
    font-size: 0.85rem;
    font-weight: 500;
    margin-bottom: 24px;
    border: 1px solid var(--border-color);
  }

  .title {
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    margin-bottom: 24px;
    color: var(--color-text);
  }

  .subtitle {
    font-size: 1.125rem;
    color: var(--color-text-muted);
    max-width: 600px;
    margin-bottom: 40px;
    font-weight: 400;
  }

  .cta-group {
    display: flex;
    gap: 16px;
    margin-bottom: 64px;
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    padding-top: 40px;
    border-top: 1px solid var(--border-color);
    max-width: 600px;
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .stat-value {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-text);
  }

  .stat-label {
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }

  @media (max-width: 768px) {
    .hero {
      padding: 140px 0 60px;
    }
    
    .cta-group {
      flex-direction: column;
    }

    .btn {
      width: 100%;
    }

    .stats {
      grid-template-columns: 1fr;
      gap: 24px;
    }
  }
</style>
