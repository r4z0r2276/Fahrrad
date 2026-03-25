<script>
  import Contact from '$lib/Contact.svelte';
</script>

<svelte:head>
  <title>Kontakt & Anfahrt | Fahrradschrauber Mülheim-Heimaterde</title>
</svelte:head>

<div class="kontakt-page">
  <div class="page-header">
    <div class="container">
      <h1>Kontakt & Anfahrt</h1>
      <p>Hier finden Sie uns. Kommen Sie gerne vorbei oder rufen Sie an!</p>
    </div>
  </div>
  
  <div class="contact-wrapper">
    <Contact />
  </div>
</div>

<style>
  .kontakt-page {
    min-height: calc(100vh - 80px);
    background: var(--color-bg);
  }

  .page-header {
    background: var(--color-primary);
    color: white;
    padding: 80px 0 60px;
    text-align: center;
    margin-bottom: -60px; /* Pulls contact card up */
  }

  .page-header h1 {
    font-size: 2.5rem;
    margin-bottom: 16px;
  }

  .page-header p {
    font-size: 1.1rem;
    opacity: 0.9;
  }
  
  .contact-wrapper {
    position: relative;
    z-index: 2;
  }
</style>
