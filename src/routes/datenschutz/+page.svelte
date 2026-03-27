<svelte:head>
  <title>Datenschutzerklärung | Fahrradschrauber Mülheim-Heimaterde</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<section class="datenschutz-page">
  <div class="page-header">
    <div class="container">
      <h1>Datenschutzerklärung</h1>
      <p>Informationen gemäß DSGVO (EU) 2016/679</p>
    </div>
  </div>

  <div class="container content">

    <div class="card">
      <h2>1. Verantwortlicher</h2>
      <p>
        <strong>Lars Kahlfuss</strong><br />
        Fahrradschrauber Mülheim-Heimaterde<br />
        Ludwig-Bender-Straße 53<br />
        45472 Mülheim an der Ruhr<br />
        Telefon: <a href="tel:+491626418118">+49 162 6418118</a>
      </p>
    </div>

    <div class="card">
      <h2>2. Erhebung und Speicherung personenbezogener Daten</h2>
      <p>
        Beim Besuch unserer Website werden automatisch Informationen allgemeiner Natur erfasst. Diese Informationen (Server-Logfiles) beinhalten etwa die Art des Webbrowsers, das verwendete Betriebssystem, den Domainnamen Ihres Internet-Service-Providers und Ähnliches. Hierbei handelt es sich ausschließlich um Informationen, welche keine Rückschlüsse auf Ihre Person zulassen.
      </p>
      <p>
        Diese Daten sind für uns technisch notwendig, um die Inhalte unserer Webseite korrekt auszuliefern, und werden nach Beendigung Ihrer Sitzung automatisch gelöscht. Sie werden nicht dauerhaft gespeichert oder ausgewertet.
      </p>
    </div>

    <div class="card">
      <h2>3. Terminanfragen & Kontaktformulare</h2>
      <p>
        Wenn Sie über unsere Website eine Terminanfrage stellen, werden die von Ihnen eingegebenen Daten (Name, Telefonnummer, Fahrzeugtyp, Problem) zum Zweck der Bearbeitung Ihrer Anfrage gespeichert. Diese Daten werden ausschließlich zur Abwicklung Ihres Auftrags genutzt und nicht an Dritte weitergegeben.
      </p>
      <p>
        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)<br />
        <strong>Speicherdauer:</strong> Die Daten werden gelöscht, sobald der Auftrag abgeschlossen ist und keine gesetzlichen Aufbewahrungsfristen entgegenstehen.
      </p>
    </div>

    <div class="card">
      <h2>4. Datenbank & Hosting</h2>
      <p>
        Diese Website wird über <strong>Vercel Inc.</strong> (340 Pine Street, Suite 701, San Francisco, CA 94104, USA) gehostet. Die Datenbank wird über <strong>Supabase</strong> (PostgreSQL) betrieben. Beide Anbieter verarbeiten Daten auf Grundlage von Standardvertragsklauseln (SCCs) gemäß Art. 46 DSGVO. Weitere Informationen finden Sie in den Datenschutzrichtlinien von <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel</a> und <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">Supabase</a>.
      </p>
    </div>

    <div class="card">
      <h2>5. Cookies</h2>
      <p>
        Unsere Website verwendet technisch notwendige Cookies ausschließlich für den internen Bereich (Admin-Login). Diese Cookies enthalten keine personenbezogenen Daten und sind für die Funktion des internen Systems erforderlich. Es werden keine Tracking- oder Marketing-Cookies eingesetzt.
      </p>
    </div>

    <div class="card">
      <h2>6. Google Fonts</h2>
      <p>
        Unsere Website lädt Schriftarten vom Dienst Google Fonts (Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA). Beim Laden der Schriftarten kann Ihre IP-Adresse an Google übermittelt werden. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der einwandfreien Darstellung der Website).
      </p>
    </div>

    <div class="card">
      <h2>7. Ihre Rechte</h2>
      <p>Sie haben gemäß DSGVO folgende Rechte gegenüber uns hinsichtlich Ihrer personenbezogenen Daten:</p>
      <ul>
        <li><strong>Recht auf Auskunft</strong> (Art. 15 DSGVO)</li>
        <li><strong>Recht auf Berichtigung</strong> (Art. 16 DSGVO)</li>
        <li><strong>Recht auf Löschung</strong> ("Recht auf Vergessenwerden", Art. 17 DSGVO)</li>
        <li><strong>Recht auf Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO)</li>
        <li><strong>Recht auf Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
        <li><strong>Recht auf Widerspruch</strong> (Art. 21 DSGVO)</li>
      </ul>
      <p>
        Zur Ausübung Ihrer Rechte wenden Sie sich bitte telefonisch an uns. Zudem haben Sie das Recht, sich bei der zuständigen Datenschutz-Aufsichtsbehörde zu beschweren.
      </p>
    </div>

    <div class="card">
      <h2>8. Aktualität dieser Datenschutzerklärung</h2>
      <p>
        Diese Datenschutzerklärung ist aktuell gültig und hat den Stand März 2025. Durch die Weiterentwicklung unserer Website kann es notwendig werden, diese Erklärung anzupassen.
      </p>
    </div>

    <div style="text-align: center; margin-top: 48px;">
      <a href="/" class="btn-back">← Zurück zur Startseite</a>
    </div>

  </div>
</section>

<style>
  .datenschutz-page {
    min-height: calc(100vh - 80px);
    background: var(--color-bg);
    padding-bottom: 80px;
  }

  .page-header {
    background: var(--color-bg-alt);
    border-bottom: 1px solid var(--border-color);
    padding: 80px 0 48px;
    text-align: center;
  }

  .page-header h1 {
    font-size: 2.5rem;
    margin-bottom: 12px;
  }

  .page-header p {
    color: var(--color-text-muted);
    font-size: 1rem;
  }

  .content {
    max-width: 800px;
    padding-top: 48px;
  }

  .card {
    background: var(--color-bg-alt);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: 32px;
    margin-bottom: 24px;
  }

  .card h2 {
    font-size: 1.2rem;
    color: var(--color-primary);
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border-color);
  }

  .card p {
    color: var(--color-text-muted);
    font-size: 0.95rem;
    line-height: 1.7;
    margin-bottom: 12px;
  }

  .card ul {
    list-style: none;
    padding: 0;
    margin: 12px 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .card ul li {
    color: var(--color-text-muted);
    font-size: 0.95rem;
    padding-left: 16px;
    position: relative;
  }

  .card ul li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: var(--color-primary);
  }

  .card a {
    color: var(--color-primary);
    text-decoration: underline;
  }

  .btn-back {
    display: inline-block;
    padding: 12px 28px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-full);
    color: var(--color-text);
    font-size: 0.95rem;
    font-weight: 500;
    transition: all 0.2s;
    text-decoration: none;
  }

  .btn-back:hover {
    background: var(--color-bg-alt);
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
</style>
