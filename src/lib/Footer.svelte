<footer class="footer">
  <div class="container footer-content">
    <div class="brand">
      <div class="logo">
        <img src="/images/logo.png" alt="Fahrradschrauber Logo" class="brand-logo" />
        <span>Fahrradschrauber</span>
      </div>
      <p class="brand-desc">Ihre zuverlässige Fahrradwerkstatt in Mülheim-Heimaterde. Qualität, die man fährt.</p>
    </div>
    
    <div class="footer-links">
      <div class="link-group">
        <h4>Navigation</h4>
        <a href="#home">Startseite</a>
        <a href="#services">Leistungen</a>
        <a href="/kontakt">Kontakt</a>
      </div>
      
      <div class="link-group">
        <h4>Rechtliches</h4>
        <a href="/impressum">Impressum</a>
        <a href="/datenschutz">Datenschutz</a>
      </div>
    </div>
  </div>
  
  <div class="footer-cta">
    <div class="container" style="text-align: center; padding: 48px 24px;">
      <h3 style="font-size: 1.8rem; margin-bottom: 12px;">Fragen oder einen Termin?</h3>
      <p style="color: var(--color-text-muted); margin-bottom: 24px;">Wir freuen uns auf Ihren Besuch in der Werkstatt.</p>
      <a href="/kontakt" class="btn btn-primary" style="padding: 14px 36px; font-size: 1.05rem;">Kontakt & Anfahrt</a>
    </div>
  </div>

  <div class="footer-bottom">
    <div class="container">
      <p>&copy; {new Date().getFullYear()} Fahrradschrauber Mülheim-Heimaterde. Alle Rechte vorbehalten.</p>
    </div>
  </div>
</footer>

<style>
  .footer {
    background: var(--color-bg);
    border-top: 1px solid var(--border-color);
    padding-top: 64px;
  }

  .footer-content {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 64px;
    margin-bottom: 48px;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 700;
    font-size: 1.1rem;
    margin-bottom: 12px;
    color: var(--color-text);
  }

  .brand-logo {
    height: 28px;
    width: auto;
    object-fit: contain;
    border-radius: 4px;
    filter: brightness(0) invert(1);
  }

  .brand-desc {
    color: var(--color-text-muted);
    font-size: 0.95rem;
    max-width: 300px;
    line-height: 1.6;
  }

  .footer-links {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 32px;
  }

  .link-group h4 {
    font-size: 1rem;
    margin-bottom: 16px;
    color: var(--color-text);
    font-weight: 600;
  }

  .link-group a {
    display: block;
    color: var(--color-text-muted);
    margin-bottom: 12px;
    font-size: 0.95rem;
    transition: color var(--transition);
  }

  .link-group a:hover {
    color: var(--color-primary);
  }

  .footer-bottom {
    background: var(--color-bg-alt);
    padding: 24px 0;
    text-align: center;
    color: var(--color-text-muted);
    font-size: 0.85rem;
    border-top: 1px solid var(--border-color);
  }

  @media (max-width: 768px) {
    .footer-content {
      grid-template-columns: 1fr;
      gap: 40px;
    }
  }
</style>
