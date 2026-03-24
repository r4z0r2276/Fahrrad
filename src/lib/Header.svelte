<script>
  let isScrolled = false;

  const handleScroll = () => {
    isScrolled = window.scrollY > 20;
  };
</script>

<svelte:window on:scroll={handleScroll} />

<header class="header {isScrolled ? 'scrolled' : ''}">
  <div class="container header-content">
    <div class="logo">
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="logo-icon"><circle cx="12" cy="12" r="10"/><path d="M16 12l-4-4-4 4M12 8v8"/></svg>
      <span class="logo-text">Fahrradschrauber</span>
    </div>

    <nav class="nav-links">
      <a href="#services" class="nav-link">Leistungen</a>
      <a href="#contact" class="nav-link">Kontakt</a>
      <a href="#contact" class="btn btn-primary" style="padding: 8px 20px; font-size: 0.9rem;">Termin buchen</a>
    </nav>
  </div>
</header>

<style>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    padding: 24px 0;
    transition: all var(--transition);
  }

  .header.scrolled {
    padding: 16px 0;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--border-color);
    box-shadow: var(--shadow-sm);
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--color-text);
    letter-spacing: -0.02em;
  }

  .logo-icon {
    color: var(--color-primary);
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 32px;
  }

  .nav-link {
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--color-text-muted);
    transition: color var(--transition);
  }

  .nav-link:hover {
    color: var(--color-text);
  }

  @media (max-width: 768px) {
    .nav-links {
      display: none;
    }
  }
</style>
