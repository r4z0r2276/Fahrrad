<script>
  export let data;
</script>

<!-- Empty layout to bypass the consumer-facing Header and Footer for the admin dashboard -->
<div class="admin-app">
  <slot />
</div>

<style>
  .admin-app {
    min-height: 100vh;
    background: var(--color-bg-alt);
  }
</style>
