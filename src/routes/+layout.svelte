<script>
  import '../app.css';
  import Header from '$lib/Header.svelte';
  import Footer from '$lib/Footer.svelte';
  import { page } from '$app/stores';
</script>

{#if !$page.url.pathname.startsWith('/admin')}
  <Header />
{/if}

<slot />

{#if !$page.url.pathname.startsWith('/admin')}
  <Footer />
{/if}
