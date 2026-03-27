<script>
  const reviews = [
    {
      name: "Christopher Klauer",
      bike: "Rennrad (Radon)",
      rating: 5,
      text: "Super Service! Ich bin mit meinem Rennrad von Radon vorbeigekommen. Das Fahrrad war leider von Werk aus komplett fehlerhaft montiert. Bremse, Schaltung und alles wurde fachgerecht eingestellt. Absolut empfehlenswert!",
      date: "vor 1 Monat"
    },
    {
      name: "Christian Wehner",
      bike: "Fahrrad",
      rating: 5,
      text: "Super Service! Hat total kurzfristig meine Bremsen erneuert und das zu einem unschlagbaren Preis. Gerne immer wieder.",
      date: "vor 1 Jahr"
    },
    {
      name: "Bettina Rust",
      bike: "Fahrrad",
      rating: 5,
      text: "Danke lieber Lars für die schnelle Reparatur meines Fahrrades, es schaltet wieder perfekt! Sehr fairer Preis und sehr netter Kontakt! Wenn nötig, komme ich gerne wieder!",
      date: "vor 2 Jahren"
    }
  ];

  // Helper Array for stars
  const starsArray = [1, 2, 3, 4, 5];
</script>

<section class="testimonials-section">
  <div class="container">
    
    <div class="section-top">
      <div>
        <h2>Was unsere Kunden sagen</h2>
        <p class="text-muted">Vertrauen ist gut, Erfahrung ist besser. Das sagen Andere über unsere Werkstatt.</p>
      </div>
      <div class="rating-badge">
        <div class="score">5.0 / 5.0</div>
        <div class="stars">
          {#each starsArray as _}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#facc15" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          {/each}
        </div>
        <div class="count">Basierend auf echten Google-Rezensionen</div>
      </div>
    </div>

    <div class="reviews-grid">
      {#each reviews as review}
        <div class="review-card">
          <div class="card-top">
            <div class="avatar">{review.name.charAt(0)}</div>
            <div class="user-meta">
              <strong>{review.name}</strong>
              <span class="bike-type">{review.bike}</span>
            </div>
            <div class="card-stars">
              {#each starsArray as star}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="{star <= review.rating ? '#facc15' : 'none'}" stroke="{star <= review.rating ? 'none' : '#4b5563'}"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              {/each}
            </div>
          </div>
          
          <div class="quote">
            "{review.text}"
          </div>
          
          <div class="card-bottom">
            <span>{review.date}</span>
          </div>
        </div>
      {/each}
    </div>

  </div>
</section>

<style>
  .testimonials-section {
    padding: 100px 0;
    background: var(--color-bg);
  }

  .section-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 60px;
    gap: 32px;
  }

  .section-top h2 {
    font-size: 2.25rem;
    margin-bottom: 12px;
    color: white;
  }

  .rating-badge {
    background: var(--color-bg-card);
    border: 1px solid var(--border-color);
    padding: 20px 32px;
    border-radius: var(--radius-lg);
    text-align: center;
    box-shadow: var(--shadow-md);
  }

  .score {
    font-size: 2rem;
    font-weight: 800;
    color: white;
    margin-bottom: 8px;
    line-height: 1;
  }

  .stars {
    display: flex;
    justify-content: center;
    gap: 4px;
    margin-bottom: 8px;
  }

  .count {
    font-size: 0.8rem;
    color: var(--color-text-muted);
  }

  .reviews-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 32px;
  }

  .review-card {
    background: var(--color-bg-alt);
    border: 1px solid rgba(255,255,255,0.03);
    border-radius: var(--radius-lg);
    padding: 32px;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease;
  }

  .review-card:hover {
    transform: translateY(-5px);
    background: var(--color-bg-card);
    border-color: rgba(255,255,255,0.08);
  }

  .card-top {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
  }

  .avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--color-primary);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    font-weight: bold;
    flex-shrink: 0;
  }

  .user-meta {
    flex-grow: 1;
  }

  .user-meta strong {
    display: block;
    color: white;
    font-size: 1.05rem;
    margin-bottom: 4px;
  }

  .bike-type {
    font-size: 0.85rem;
    color: var(--color-text-muted);
    background: rgba(255,255,255,0.05);
    padding: 2px 8px;
    border-radius: 4px;
  }

  .card-stars {
    display: flex;
    gap: 2px;
  }

  .quote {
    color: var(--color-text);
    font-size: 1.05rem;
    line-height: 1.6;
    flex-grow: 1;
    margin-bottom: 24px;
    font-style: italic;
  }

  .card-bottom {
    font-size: 0.8rem;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 1px;
    border-top: 1px solid rgba(255,255,255,0.05);
    padding-top: 16px;
  }

  @media (max-width: 768px) {
    .section-top {
      flex-direction: column;
      align-items: flex-start;
    }
    .rating-badge {
      width: 100%;
    }
  }
</style>
