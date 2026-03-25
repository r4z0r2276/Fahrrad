<script>
  export let form;
</script>

<div class="login-container">
  <div class="login-card">
    <div class="login-header">
      <img src="/images/logo.png" alt="Fahrradschrauber Logo" class="brand-logo" />
      <h2>Admin Login</h2>
      <p>Bitte melden Sie sich an, um Termine zu verwalten.</p>
    </div>

    <!-- Error message display -->
    {#if form?.error}
      <div class="error-msg">
        <p>{form.error}</p>
      </div>
    {/if}

    <form method="POST" action="?/login">
      <div class="form-group">
        <label for="username">Benutzername</label>
        <input type="text" id="username" name="username" required autocomplete="username" />
      </div>

      <div class="form-group">
        <label for="password">Passwort</label>
        <input type="password" id="password" name="password" required />
      </div>

      <button type="submit" class="btn btn-primary login-btn">Anmelden</button>
      <a href="/" class="back-link">Zurück zur Website</a>
    </form>
  </div>
</div>

<style>
  .login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-bg-alt);
    padding: 24px;
  }

  .login-card {
    background: var(--color-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    width: 100%;
    max-width: 420px;
    padding: 40px;
  }

  .login-header {
    text-align: center;
    margin-bottom: 32px;
  }

  .brand-logo {
    height: 44px;
    width: auto;
    object-fit: contain;
    margin-bottom: 16px;
    display: inline-block;
  }

  .login-header h2 {
    font-size: 1.5rem;
    margin-bottom: 8px;
  }

  .login-header p {
    color: var(--color-text-muted);
    font-size: 0.95rem;
  }

  .error-msg {
    background: rgba(220, 38, 38, 0.1);
    color: #dc2626;
    padding: 12px 16px;
    border-radius: var(--radius-md);
    font-size: 0.9rem;
    margin-bottom: 24px;
    border: 1px solid #fecaca;
  }

  .form-group {
    margin-bottom: 20px;
  }

  label {
    display: block;
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 8px;
    color: var(--color-text);
  }

  input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    font-family: inherit;
    font-size: 1rem;
    transition: all var(--transition);
  }

  input:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.1);
  }

  .login-btn {
    width: 100%;
    margin-top: 8px;
    padding: 14px;
  }

  .back-link {
    display: block;
    text-align: center;
    margin-top: 24px;
    font-size: 0.9rem;
    color: var(--color-text-muted);
    transition: color 0.2s;
  }

  .back-link:hover {
    color: var(--color-primary);
  }
</style>
