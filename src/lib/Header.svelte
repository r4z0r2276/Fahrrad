<script>
  import { page } from '$app/stores';

  let isScrolled = false;
  let isMobileMenuOpen = false;

  const handleScroll = () => {
    isScrolled = window.scrollY > 20;
  };
  
  // Automatically close mobile menu on navigation (using SvelteKit page store reactive syntax)
  $: if ($page.url.pathname) {
    isMobileMenuOpen = false;
  }
</script>

<svelte:window on:scroll={handleScroll} />

<header class="header {isScrolled ? 'scrolled' : ''}">
  <div class="container header-content">
    <a href="/" class="logo" on:click={() => isMobileMenuOpen = false}>
      <img src="/images/logo.png" alt="Fahrradschrauber Logo" class="brand-logo" />
      <span class="logo-text">Fahrradschrauber</span>
    </a>

    <nav class="nav-links desktop-only">
      <a href="/#services" class="nav-link">Leistungen</a>
      <a href="/kontakt" class="nav-link">Kontakt</a>
      <a href="/status" class="nav-link icon-link" title="Kunden-Portal" aria-label="Kunden-Portal">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
      </a>
      <a href="/admin/login" class="nav-link icon-link" title="Mitarbeiter Login" aria-label="Login">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" /></svg>
      </a>
      <a href="/termin" class="btn btn-primary" style="padding: 8px 20px; font-size: 0.9rem;">Termin buchen</a>
    </nav>
    
    <button class="menu-toggle" on:click={() => isMobileMenuOpen = !isMobileMenuOpen} aria-label="Mobile Menü">
      {#if isMobileMenuOpen}
        <!-- X icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
      {:else}
        <!-- Hamburger icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
      {/if}
    </button>
  </div>
  
  {#if isMobileMenuOpen}
    <div class="mobile-menu">
      <nav class="mobile-nav">
        <a href="/#services" class="mobile-link" on:click={() => isMobileMenuOpen = false}>Leistungen</a>
        <a href="/kontakt" class="mobile-link" on:click={() => isMobileMenuOpen = false}>Kontakt</a>
        <a href="/status" class="mobile-link" on:click={() => isMobileMenuOpen = false}>Status checken</a>
        <a href="/termin" class="btn btn-primary mobile-btn" on:click={() => isMobileMenuOpen = false}>Termin buchen</a>
        <div class="mobile-divider"></div>
        <a href="/admin/login" class="mobile-link admin-mobile" on:click={() => isMobileMenuOpen = false}>
          Interner Login
        </a>
      </nav>
    </div>
  {/if}
</header>

<style>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    transition: all 0.3s ease;
    padding: 20px 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--border-color);
  }

  .header.scrolled {
    padding: 12px 0;
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
    text-decoration: none;
    z-index: 1001; /* Keep logo above mobile menu overlay */
  }

  .brand-logo {
    height: 44px;
    width: auto;
    object-fit: contain;
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
    transition: color 0.2s;
  }

  .nav-link:hover {
    color: var(--color-text);
  }

  .icon-link {
    display: flex;
    align-items: center;
    opacity: 0.5;
    padding: 4px 0;
  }
  
  .icon-link:hover {
    opacity: 1;
    color: var(--color-primary);
  }
  
  /* Mobile Menu Styles */
  .menu-toggle {
    display: none;
    background: transparent;
    border: none;
    color: var(--color-text);
    cursor: pointer;
    padding: 8px;
    margin-right: -8px;
    z-index: 1001; /* Keep menu button above mobile menu overlay */
  }

  .mobile-menu {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border-color);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    padding: 24px;
    animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .mobile-link {
    display: block;
    width: 100%;
    padding: 14px 16px;
    font-size: 1.15rem;
    font-weight: 500;
    color: var(--color-text);
    text-align: center;
    text-decoration: none;
    border-radius: var(--radius-md);
    transition: background 0.2s ease;
  }
  
  .mobile-link:hover {
    background: var(--color-bg-alt);
  }

  .mobile-btn {
    width: 100%;
    margin-top: 16px;
    padding: 14px;
    font-size: 1.1rem;
  }

  .mobile-divider {
    width: 100%;
    height: 1px;
    background: var(--border-color);
    margin: 8px 0;
  }

  .admin-mobile {
    font-size: 0.95rem;
    color: var(--color-text-muted);
    opacity: 0.6;
    padding: 8px;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    .desktop-only {
      display: none;
    }
    .menu-toggle {
      display: block;
    }
  }
</style>
