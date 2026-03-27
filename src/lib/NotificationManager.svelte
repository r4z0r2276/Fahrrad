<script>
  import { onMount, createEventDispatcher } from 'svelte';
  
  export let enabled = false;
  const dispatch = createEventDispatcher();

  onMount(() => {
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        enabled = true;
      }
    }
  });

  async function requestPermission() {
    if (!("Notification" in window)) {
      alert("Dieser Browser unterstützt keine Desktop-Benachrichtigungen.");
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      enabled = true;
      showNotification("Benachrichtigungen aktiviert!", "Du wirst nun über neue Ereignisse informiert.");
    }
  }

  export function showNotification(title, body) {
    if (Notification.permission === "granted") {
      new Notification(title, {
        body: body,
        icon: '/pwa-icon-192.png'
      });
      
      // Vibration if supported
      if ("vibrate" in navigator) {
        navigator.vibrate([200, 100, 200]);
      }
    }
  }
</script>

{#if !enabled}
  <div class="notif-bar hide-print">
    <div class="container" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0;">
      <span style="font-size: 0.9rem;">🔔 Möchtest du über neue Buchungen & Nachrichten informiert werden?</span>
      <button class="btn-primary" style="padding: 6px 12px; font-size: 0.85rem;" on:click={requestPermission}>Aktivieren</button>
    </div>
  </div>
{/if}

<style>
  .notif-bar {
    background: rgba(255, 106, 0, 0.1);
    border-bottom: 1px solid rgba(255, 106, 0, 0.3);
    color: var(--color-text);
  }
</style>
