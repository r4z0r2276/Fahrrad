<script>
  import { onMount, onDestroy } from 'svelte';
  
  const images = [
    { src: '/images/2022-08-22.webp', alt: 'Fahrradschrauber Werkstatt Einblick' },
    { src: '/images/2023-02-25.webp', alt: 'Fachgerechte Fahrrad Reparatur' },
    { src: '/images/2023-02-25 (1).webp', alt: 'Inspektion und Wartung' }
  ];
  
  let currentIndex = 0;
  let interval;

  onMount(() => startSlideshow());
  onDestroy(() => stopSlideshow());

  function startSlideshow() {
    stopSlideshow();
    interval = setInterval(nextSlide, 4500);
  }

  function stopSlideshow() {
    if (interval) clearInterval(interval);
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    startSlideshow(); 
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    startSlideshow(); 
  }

  function goToSlide(index) {
    currentIndex = index;
    startSlideshow();
  }

  function getSlideClass(i, current) {
    if (i === current) return 'active';
    if (i === (current - 1 + images.length) % images.length) return 'prev';
    if (i === (current + 1) % images.length) return 'next';
    return 'hidden'; 
  }
  
  function handleSlideClick(i) {
    let type = getSlideClass(i, currentIndex);
    // Erlaube Klicken auf Seitenbilder um hinzuspringen
    if (type === 'prev') prevSlide();
    if (type === 'next') nextSlide();
  }
</script>

<section class="gallery-slider">
  <div class="slider-container">
    <button class="nav-btn prev-btn" on:click={prevSlide} aria-label="Vorheriges Bild">
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    
    <div class="slides-wrapper">
      {#each images as image, i}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="slide {getSlideClass(i, currentIndex)}" on:click={() => handleSlideClick(i)}>
          <img src={image.src} alt={image.alt} loading={i === 0 ? 'eager' : 'lazy'} />
        </div>
      {/each}
    </div>

    <button class="nav-btn next-btn" on:click={nextSlide} aria-label="Nächstes Bild">
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
  
  <div class="dots-container">
    {#each images as _, i}
      <button class="dot {i === currentIndex ? 'active' : ''}" on:click={() => goToSlide(i)} aria-label="Bild {i + 1}"></button>
    {/each}
  </div>
</section>

<style>
  .gallery-slider {
    padding: 80px 0 40px;
    max-width: 1200px;
    margin: 0 auto;
    overflow: hidden;
  }

  .slider-container {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
  }

  .slides-wrapper {
    position: relative;
    width: 65%;
    max-width: 800px;
    aspect-ratio: 16 / 10;
    perspective: 1200px;
  }

  .slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    overflow: hidden;
    transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    background: var(--color-bg-alt);
    user-select: none;
  }

  .slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
    display: block;
  }

  .slide.active {
    transform: translateX(0) translateZ(0) scale(1);
    z-index: 3;
    opacity: 1;
    box-shadow: 0 20px 40px rgba(0,0,0,0.25);
  }

  .slide.prev {
    transform: translateX(-65%) translateZ(-150px) scale(0.85);
    z-index: 2;
    opacity: 0.6;
    cursor: pointer;
  }

  .slide.next {
    transform: translateX(65%) translateZ(-150px) scale(0.85);
    z-index: 2;
    opacity: 0.6;
    cursor: pointer;
  }
  
  .slide.prev:hover {
    opacity: 0.9;
    transform: translateX(-65%) translateZ(-150px) scale(0.88);
  }

  .slide.next:hover {
    opacity: 0.9;
    transform: translateX(65%) translateZ(-150px) scale(0.88);
  }
  
  /* Fallback if more than 3 images */
  .slide.hidden {
    transform: translateX(0) translateZ(-300px) scale(0.5);
    z-index: 1;
    opacity: 0;
    pointer-events: none;
  }

  .nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(4px);
    color: var(--color-primary);
    border: 1px solid var(--border-color);
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
  }

  .nav-btn:hover {
    background: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
    transform: translateY(-50%) scale(1.1);
  }

  .prev-btn { left: 4%; }
  .next-btn { right: 4%; }

  .dots-container {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 24px;
    position: relative;
    z-index: 10;
  }

  .dot {
    width: 10px;
    height: 10px;
    padding: 0;
    border-radius: 50%;
    background: var(--color-accent);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .dot.active {
    background: var(--color-primary);
    transform: scale(1.3);
  }

  @media (max-width: 768px) {
    .slides-wrapper {
      width: 70%;
      aspect-ratio: 4 / 3;
    }
    .slide.prev { transform: translateX(-40%) translateZ(-150px) scale(0.8); }
    .slide.next { transform: translateX(40%) translateZ(-150px) scale(0.8); }
    .slide.prev:hover { transform: translateX(-40%) translateZ(-150px) scale(0.82); }
    .slide.next:hover { transform: translateX(40%) translateZ(-150px) scale(0.82); }
    
    .nav-btn {
      width: 40px;
      height: 40px;
    }
    .prev-btn { left: 2%; }
    .next-btn { right: 2%; }
  }
</style>
