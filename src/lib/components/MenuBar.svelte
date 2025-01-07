<script lang="ts">
  import { onMount } from 'svelte';

  let currentTime = new Date();
  let interval: number;

  onMount(() => {
    interval = window.setInterval(() => {
      currentTime = new Date();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  $: timeString = currentTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  $: dateString = currentTime.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  let menuItems = ['Finder', 'File', 'Edit', 'View', 'Go', 'Window', 'Help'];

  function handleMenuClick(item: string) {
    console.log(`Menu item clicked: ${item}`);
  }
</script>

<div class="fixed top-0 left-0 right-0 h-7 bg-black/20 backdrop-blur-xl z-50 flex items-center px-4">
  <div class="flex items-center space-x-6">
    <!-- Apple Logo -->
    <button class="text-white/90 hover:text-white transition-colors">
      <svg class="w-4 h-4" viewBox="0 0 814 1000" fill="currentColor">
        <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
      </svg>
    </button>

    <!-- Menu Items -->
    <nav class="flex items-center space-x-4">
      {#each menuItems as item}
        <button 
          class="text-body-m text-white/80 hover:text-white transition-colors"
          on:click={() => handleMenuClick(item)}
        >
          {item}
        </button>
      {/each}
    </nav>
  </div>

  <!-- Right Side -->
  <div class="ml-auto flex items-center space-x-4">
    <div class="text-body-m text-white/80">
      <span class="opacity-90">{dateString}</span>
      <span class="time opacity-90">{timeString}</span>
    </div>
  </div>
</div>

<style lang="postcss">
  .fixed {
    position: fixed;
  }

  .top-0 {
    top: 0;
  }

  .left-0 {
    left: 0;
  }

  .right-0 {
    right: 0;
  }

  .h-7 {
    height: 1.75rem;
  }

  .bg-black\/20 {
    background-color: rgba(0, 0, 0, 0.2);
  }

  .backdrop-blur-xl {
    backdrop-filter: blur(1.25rem);
  }

  .z-50 {
    z-index: 50;
  }

  .flex {
    display: flex;
  }

  .items-center {
    align-items: center;
  }

  .px-4 {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .space-x-6 {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }

  .text-white\/90 {
    color: rgba(255, 255, 255, 0.9);
  }

  .hover\:text-white {
    transition-property: color;
    transition-duration: 0.2s;
  }

  .hover\:text-white:hover {
    color: #fff;
  }

  .transition-colors {
    transition-property: color;
    transition-duration: 0.2s;
  }

  .w-4 {
    width: 1rem;
  }

  .h-4 {
    height: 1rem;
  }

  .text-body-m {
    font-size: 0.875rem;
  }

  .text-white\/80 {
    color: rgba(255, 255, 255, 0.8);
  }

  .ml-auto {
    margin-left: auto;
  }

  .opacity-90 {
    opacity: 0.9;
  }

  .time {
    min-width: 3.875rem;
    text-align: right;
  }
</style>
