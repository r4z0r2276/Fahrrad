<script>
  import { onMount } from 'svelte';
  
  let visible = false;
  
  onMount(() => {
    // Simple intersection observer to animate team section
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        visible = true;
      }
    }, { threshold: 0.2 });
    
    const el = document.getElementById('team-section');
    if (el) observer.observe(el);
  });
</script>

<section id="team-section" class="team-section">
  <div class="container">
    <div class="team-grid {visible ? 'is-visible' : ''}">
      
      <div class="team-image-col">
        <div class="image-wrapper">
          <div class="decorative-box"></div>
          <!-- We use a subtle mechanical/carbon abstract placeholder or gradient since we have no real photo yet -->
          <div class="photo-placeholder">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="wrench-icon"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
          </div>
          <div class="experience-badge">
            <span class="years">15+</span>
            <span class="text">Jahre<br>Erfahrung</span>
          </div>
        </div>
      </div>

      <div class="team-content-col">
        <h2 class="subtitle">ÜBER DIE WERKSTATT</h2>
        <h3 class="title">Dein Reparatur-Spezialist in Mülheim</h3>
        
        <p class="bio">
          Hi, ich bin Lars! Fahrräder sind nicht nur mein Beruf, sondern meine absolute Leidenschaft. Angefangen hat alles vor über 15 Jahren in der eigenen Garage. Mittlerweile sind wir ein stolzer Meisterbetrieb mitten in Mülheim-Heimaterde.
        </p>
        
        <p class="bio">
          Egal ob das geliebte Bio-Bike streikt, das hochmoderne E-Bike ein Software-Update braucht oder die Bremsen am Rennrad schleifen – in meiner Werkstatt wird jedes Zweirad mit höchster Präzision und Sorgfalt behandelt.
        </p>

        <ul class="values-list">
          <li>
            <div class="val-icon">🏆</div>
            <div>
              <strong>Qualität ohne Kompromisse</strong>
              <span>Wir verbauen nur Premium-Ersatzteile.</span>
            </div>
          </li>
          <li>
            <div class="val-icon">⏱️</div>
            <div>
              <strong>Schnell & Zuverlässig</strong>
              <span>Dank digitalem Ticket-System immer informiert.</span>
            </div>
          </li>
          <li>
            <div class="val-icon">🤝</div>
            <div>
              <strong>Ehrliche Beratung</strong>
              <span>Repariert wird nur, was wirklich kaputt ist.</span>
            </div>
          </li>
        </ul>
        
        <div class="action-row">
          <a href="/kontakt" class="btn btn-outline">Lerne mich kennen</a>
        </div>
      </div>

    </div>
  </div>
</section>

<style>
  .team-section {
    padding: 120px 0;
    background: var(--color-bg);
    overflow: hidden;
  }

  .team-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .team-grid.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Image Side */
  .team-image-col {
    position: relative;
    padding: 20px;
  }

  .image-wrapper {
    position: relative;
    border-radius: var(--radius-lg);
    aspect-ratio: 4/5;
    z-index: 2;
  }

  .decorative-box {
    position: absolute;
    top: -20px;
    left: -20px;
    right: 20px;
    bottom: 20px;
    border: 2px solid var(--color-primary);
    border-radius: var(--radius-lg);
    z-index: -1;
    opacity: 0.3;
  }

  .photo-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--color-bg-card), #111);
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255,255,255,0.05);
  }

  .wrench-icon {
    color: var(--color-text-muted);
    opacity: 0.2;
    transform: scale(3);
  }

  .experience-badge {
    position: absolute;
    bottom: -30px;
    right: -30px;
    background: var(--color-primary);
    color: white;
    padding: 20px 30px;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(249, 115, 22, 0.3);
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .experience-badge .years {
    font-size: 2.5rem;
    font-weight: 800;
    line-height: 1;
  }

  .experience-badge .text {
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    line-height: 1.3;
  }

  /* Content Side */
  .subtitle {
    font-size: 0.9rem;
    color: var(--color-primary);
    font-weight: 700;
    letter-spacing: 2px;
    margin-bottom: 12px;
    text-transform: uppercase;
  }

  .title {
    font-size: 2.5rem;
    line-height: 1.2;
    margin-bottom: 24px;
    color: white;
  }

  .bio {
    font-size: 1.1rem;
    color: var(--color-text-muted);
    line-height: 1.7;
    margin-bottom: 24px;
  }

  .values-list {
    list-style: none;
    padding: 0;
    margin: 40px 0;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .values-list li {
    display: flex;
    align-items: flex-start;
    gap: 16px;
  }

  .val-icon {
    font-size: 1.5rem;
    background: rgba(255,255,255,0.05);
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.05);
  }

  .values-list strong {
    display: block;
    color: white;
    font-size: 1.1rem;
    margin-bottom: 4px;
  }

  .values-list span {
    color: var(--color-text-muted);
    font-size: 0.95rem;
  }

  .action-row {
    margin-top: 40px;
  }

  @media (max-width: 900px) {
    .team-grid {
      grid-template-columns: 1fr;
      gap: 60px;
    }
    .experience-badge {
      right: 20px;
      bottom: -20px;
    }
    .title {
      font-size: 2rem;
    }
  }
</style>
