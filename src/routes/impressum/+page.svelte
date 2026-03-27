<svelte:head>
  <title>Impressum | Fahrradschrauber Mülheim-Heimaterde</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<section class="impressum-page">
  <div class="page-header">
    <div class="container">
      <h1>Impressum</h1>
      <p>Angaben gemäß § 5 TMG</p>
    </div>
  </div>

  <div class="container content">

    <div class="card">
      <h2>Angaben gemäß § 5 TMG</h2>
      <p>
        <strong>Lars Kahlfuss</strong><br />
        Fahrradschrauber Mülheim-Heimaterde<br />
        Ludwig-Bender-Straße 53<br />
        45472 Mülheim an der Ruhr
      </p>
    </div>

    <div class="card">
      <h2>Kontakt</h2>
      <p>
        <strong>Telefon:</strong> <a href="tel:+491626418118">+49 162 6418118</a><br />
      </p>
    </div>

    <div class="card">
      <h2>Umsatzsteuer</h2>
      <p>
        Gemäß § 19 UStG (Kleinunternehmerregelung) wird keine Umsatzsteuer berechnet und ausgewiesen.
      </p>
    </div>

    <div class="card">
      <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
      <p>
        Lars Kahlfuss<br />
        Ludwig-Bender-Straße 53<br />
        45472 Mülheim an der Ruhr
      </p>
    </div>

    <div class="card">
      <h2>Haftungsausschluss</h2>

      <h3>Haftung für Inhalte</h3>
      <p>
        Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
      </p>
      <p>
        Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
      </p>

      <h3>Haftung für Links</h3>
      <p>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
      </p>

      <h3>Urheberrecht</h3>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
      </p>
    </div>

    <div class="card">
      <h2>Online-Streitbeilegung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a><br />
        Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>
    </div>

    <div style="text-align: center; margin-top: 48px;">
      <a href="/" class="btn btn-outline">← Zurück zur Startseite</a>
    </div>

  </div>
</section>

<style>
  .impressum-page {
    min-height: calc(100vh - 80px);
    background: var(--color-bg);
    padding-bottom: 80px;
  }

  .page-header {
    background: var(--color-bg-alt);
    border-bottom: 1px solid var(--border-color);
    padding: 80px 0 48px;
    text-align: center;
    margin-bottom: 0;
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
    font-size: 1.25rem;
    color: var(--color-primary);
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border-color);
  }

  .card h3 {
    font-size: 1rem;
    color: var(--color-text);
    margin: 20px 0 8px;
  }

  .card p {
    color: var(--color-text-muted);
    font-size: 0.95rem;
    line-height: 1.7;
    margin-bottom: 12px;
  }

  .card a {
    color: var(--color-primary);
    text-decoration: underline;
  }

  .btn-outline {
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

  .btn-outline:hover {
    background: var(--color-bg-alt);
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
</style>
